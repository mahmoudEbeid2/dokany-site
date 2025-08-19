import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Default avatar image
  const defaultAvatar = "/src/assets/default-avatar.svg";

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/api/customer/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setFormData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadToCloudinary = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/ddkiltr7i/image/upload"}`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();
      return data.secure_url || null;
    } catch {
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;

    const url = await uploadToCloudinary(file);
    if (!url || url.startsWith("blob:")) return;

    const updatedUser = { ...formData, profile_imge: url };
    setFormData(updatedUser);
    await handleSubmit(updatedUser, false);
  };

  const handleSubmit = async (dataToSend = formData, showToast = true) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API}/api/customer/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const updated = await res.json();
      if (!res.ok) {
        if (showToast) toast.error(updated.message || "Update failed");
        return;
      }

      if (showToast) toast.success("Updated successfully");
    } catch {
      if (showToast) toast.error("Update error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="account-container">

      <h1 className="account-title">My Account</h1>

      <div className="account-content">
        <aside className="account-sidebar">
          <div className="profile-wrapper">
            <img
              src={formData.profile_imge || defaultAvatar}
              alt="User"
              className="profile-img"
            />
            <label className="camera-icon">
              <Camera size={20} />
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>

          <h3 className="user-name">
            {formData.f_name} {formData.l_name}
          </h3>

          <ul className="sidebar-menu">
            <li>
              <NavLink 
                to="/myaccount" 
                className={({ isActive }) => isActive ? "active" : ""}
                end
              >
                Account
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/myaccount/orders" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                Orders
              </NavLink>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="logout-btn"
              >
                Log Out
              </button>
            </li>
          </ul>
        </aside>

        <section className="account-details">
          <Outlet context={{ formData, handleChange, handleSubmit }} />
        </section>
      </div>
    </div>
  );
};

export default MyAccount;
