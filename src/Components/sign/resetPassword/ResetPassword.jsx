import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";

const requestResetSchema = z.object({
  email: z.string().email("Invalid email address."),
});

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const subdomain = window.location.hostname.split(".")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setErrors({});

    const result = requestResetSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/auth/customer/reset-password`,
        {
          email: result.data.email,
          subdomain
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Request Reset Link Error:", error.response || error);
      const errorMsg =
        error.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      setApiError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const errorStyle = {
    color: "var(--reset-error)",
    fontSize: "0.8rem",
    marginTop: "4px",
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authImageSection}>
        <img src="/signUp/Dokany.jpg" alt="Dokany E-commerce" />
      </div>

      <div className={styles.authFormSection}>
        <div className={styles.formWrapper}>
          <h2>Reset Password</h2>
          <p className={styles.insturctionsText}>
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            {apiError && (
              <p
                style={{
                  ...errorStyle,
                  textAlign: "center",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {apiError}
              </p>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <p style={errorStyle}>{errors.email[0]}</p>}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className={styles.switchAuthLink}>
              Remembered your password? <a href="/signin">Back to Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
