import React from "react";

const AccountForm = ({ formData, handleChange, handleSubmit }) => {
  return (
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
  );
};

export default AccountForm;
