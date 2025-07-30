import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./LogoutButton.module.css"; // We'll create this file next

const LogoutButton = ({ onLogoutSuccess }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem("token");

    // 2. Notify the user
    toast.success("Logged out successfully!");

    // 3. Call the parent's callback function to update the UI state (e.g., hide protected links)
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }

    // 4. Redirect the user to the sign-in page
    navigate("/signin");
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
