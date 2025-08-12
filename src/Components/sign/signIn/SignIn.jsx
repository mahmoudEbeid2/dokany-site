import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const customerLoginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
  subdomain: z.string().min(1, "Subdomain is required."),
});

const SignIn = ({ onLoginSuccess }) => {
  const subdomain = window.location.hostname.split(".")[0];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    subdomain: subdomain,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  // ✅ دالة التحقق من حقل واحد عند الـ onBlur
  const validateField = (name, value) => {
    const singleFieldSchema = customerLoginSchema.pick({ [name]: true });
    const result = singleFieldSchema.safeParse({ [name]: value });

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.flatten().fieldErrors[name],
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setErrors({});

    const result = customerLoginSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_API}/auth/customer/login`;
      const response = await axios.post(apiUrl, result.data);

      toast.success("Logged in successfully!");
      localStorage.setItem("token", response.data.token);

      if (onLoginSuccess) {
        onLoginSuccess();
      }
      navigate("/home");
    } catch (error) {
      const errorData = error.response?.data;
      const errorMsg = errorData?.error || "An unexpected error occurred.";

      if (errorMsg === "Invalid credentials for this seller") {
        setErrors({ email: ["Invalid credentials for this seller."] });
      } else if (errorMsg === "Invalid password") {
        setErrors({ password: ["The password you entered is incorrect."] });
      } else if (errorMsg === "Invalid seller domain") {
        setErrors({ subdomain: ["This seller domain does not exist."] });
      } else if (errorData?.details) {
        setErrors(errorData.details);
      } else {
        setApiError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const errorStyle = {
    color: "var(--signin-error)",
    fontSize: "0.8rem",
    marginTop: "2px",
    marginBottom: "2px",
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signinImageSection}>
        <img src="/signUp/Dokany.jpg" alt="Dokany E-commerce Website" />
      </div>

      <div className={styles.signinFormSection}>
        <div className={styles.formWrapper}>
          <h2>Sign in</h2>
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
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <p style={errorStyle}>{errors.email[0]}</p>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  placeholder="Enter your password"
                  className={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordIcon}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p style={errorStyle}>{errors.password[0]}</p>
              )}
            </div>

            <div className={styles.rememberForgot}>
              <div className={styles.rememberMe}>
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <p>Remember me</p>
              </div>
              <div className={styles.forgotPassword}>
                <a href="/reset-password">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className={styles.signinBtn}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className={styles.signupLink}>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
