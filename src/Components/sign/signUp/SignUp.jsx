import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const signupSchema = z
  .object({
    f_name: z.string().min(2, "First name must be at least 2 characters."),
    l_name: z.string().min(2, "Last name must be at least 2 characters."),
    user_name: z.string().min(3, "Username must be at least 3 characters."),
    email: z.string().email("Invalid email address."),
    phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format."),
    city: z.string().min(1, "City is required."),
    governorate: z.string().min(1, "Governorate is required."),
    country: z.string().min(1, "Country is required."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
    subdomain: z.string().min(1, "Subdomain is required."),
    profile_imge: z.any().optional(),
    agreedToTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the Terms of Use and Privacy Policy.",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const initialState = {
  f_name: "",
  l_name: "",
  user_name: "",
  email: "",
  phone: "",
  city: "",
  governorate: "",
  country: "",
  password: "",
  confirmPassword: "",
  subdomain: "",
  profile_imge: null,
  agreedToTerms: false,
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const subdomain = window.location.hostname.split(".")[0];

    if (subdomain === "localhost" || subdomain === "www") {
      setApiError(
        "Cannot create an account from this URL. Please use a seller's store URL."
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      subdomain: subdomain,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "profile_imge" && files && files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subdomain) {
      setApiError(
        "Could not verify seller information. Please refresh the page or use a valid store URL."
      );
      return;
    }
    setApiError(null);
    setErrors({});
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    const dataToSubmit = new FormData();
    Object.keys(result.data).forEach((key) => {
      if (key !== "confirmPassword" && key !== "agreedToTerms") {
        dataToSubmit.append(key, result.data[key]);
      }
    });

    try {
      const apiUrl = `${import.meta.env.VITE_API}/auth/customer/register`;
      const response = await axios.post(apiUrl, dataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form Submitted Successfully:", response.data);
      toast.success(`Account created successfully!`);
      navigate("/signin");
      setFormData(initialState);
      setImagePreview(null);
      e.target.reset();
    } catch (error) {
      console.error("Submission Error:", error.response || error);
      const errorData = error.response?.data;

      if (errorData && errorData.details) {
        setErrors(errorData.details);
        setApiError("Please review the errors below.");
      } else if (errorData && errorData.error) {
        setApiError(errorData.error);
      } else {
        setApiError(
          "A network error occurred or the server is unreachable. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const placeholderIcon = (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 12C18 12 18 16 18 16V18H6V16C6 16 6 12 12 12Z"
        stroke="#6C7275"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const errorStyle = {
    color: "var(--signup-error)",
    fontSize: "0.8rem",
    marginTop: "1px",
    marginBottom: "1px",
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupImageSection}>
        <img src="/signUp/Dokany.jpg" alt="Dokany E-commerce Website" />
      </div>

      <div className={styles.signupFormSection}>
        <div className={styles.formWrapper}>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit} noValidate>
            {apiError && (
              <p
                style={{
                  ...errorStyle,
                  textAlign: "center",
                  fontSize: "1rem",
                  marginBottom: "0rem",
                }}
              >
                {apiError}
              </p>
            )}
            <div className={styles.profileImageUploader}>
              <label
                htmlFor="profile_imge"
                className={styles.profileImagePreview}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" />
                ) : (
                  placeholderIcon
                )}
              </label>
              <input
                type="file"
                id="profile_imge"
                name="profile_imge"
                onChange={handleChange}
                style={{ display: "none" }}
                accept="image/*"
              />
              <p>Add a profile picture</p>
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="f_name">First Name</label>
                <input
                  type="text"
                  id="f_name"
                  name="f_name"
                  value={formData.f_name}
                  onChange={handleChange}
                  placeholder="First name"
                />
                {errors.f_name && <p style={errorStyle}>{errors.f_name[0]}</p>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="l_name">Last Name</label>
                <input
                  type="text"
                  id="l_name"
                  name="l_name"
                  value={formData.l_name}
                  onChange={handleChange}
                  placeholder="Last name"
                />
                {errors.l_name && <p style={errorStyle}>{errors.l_name[0]}</p>}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="user_name">Username</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Enter a username"
              />
              {errors.user_name && (
                <p style={errorStyle}>{errors.user_name[0]}</p>
              )}
            </div>
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
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              {errors.phone && <p style={errorStyle}>{errors.phone[0]}</p>}
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                {errors.city && <p style={errorStyle}>{errors.city[0]}</p>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="governorate">Governorate</label>
                <input
                  type="text"
                  id="governorate"
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  placeholder="Governorate"
                />
                {errors.governorate && (
                  <p style={errorStyle}>{errors.governorate[0]}</p>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
                {errors.country && (
                  <p style={errorStyle}>{errors.country[0]}</p>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={styles.passwordInputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
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
                {errors.confirmPassword && (
                  <p style={errorStyle}>{errors.confirmPassword[0]}</p>
                )}
              </div>
            </div>
            <div className={styles.termsGroup}>
              <input
                type="checkbox"
                id="agreedToTerms"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreedToTerms">
                I agree with{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy and Terms of Use
                </a>
              </label>
            </div>
            {errors.agreedToTerms && (
              <p style={errorStyle}>{errors.agreedToTerms[0]}</p>
            )}
            <button
              type="submit"
              className={styles.createAccountBtn}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          <p className={styles.signinLink}>
            Already have an account? <a href="/signin">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
