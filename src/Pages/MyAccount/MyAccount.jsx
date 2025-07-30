import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import avatar from "../../assets/av_blank.png";
import { Camera } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZG1jdTZ5bzAwMzBseHJtNnZ5dXhhdTAiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2NjIwOTksImV4cCI6MTc1NDI2Njg5OX0.NdwhH2nGMAxvSfrz15dfDXmuWoXbu5SOy78D7BmX5o8";

const MyAccount = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          "https://dokany-api-production.up.railway.app/api/customer/me",
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
        "https://dokany-api-production.up.railway.app/api/customer/me",
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

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
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
            <li className="active">Account</li>
            <li>Orders</li>
            <li>Log Out</li>
          </ul>
        </aside>

        <section className="account-details">
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
        </section>
      </div>
    </div>
  );
};

export default MyAccount;
