import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import avatar from "../../assets/av_blank.png";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Orders from "../../Components/Orders/Orders";

const MyAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const token = localStorage.getItem("token");

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
    form.append("upload_preset", "ml_default");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddkiltr7i/image/upload",
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
              src={formData.profile_imge || avatar}
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
            <li
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              Account
            </li>
            <li
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </li>
            <li onClick={handleLogout}>Log Out</li>
          </ul>
        </aside>

        <section className="account-details">
          {activeTab === "account" ? (
            <form
              className="account-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="form-group">
                <label className="labelMyAcc">User Name *</label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="labelMyAcc">First Name *</label>
                  <input
                    type="text"
                    name="f_name"
                    value={formData.f_name || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="labelMyAcc">Last Name *</label>
                  <input
                    type="text"
                    name="l_name"
                    value={formData.l_name || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="labelMyAcc">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="labelMyAcc">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="labelMyAcc">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="labelMyAcc">Governorate</label>
                  <input
                    type="text"
                    name="governorate"
                    value={formData.governorate || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="labelMyAcc">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="save-btn">
                Save changes
              </button>
            </form>
          ) : (
            <Orders />
          )}
        </section>
      </div>
    </div>
  );
};

export default MyAccount;
