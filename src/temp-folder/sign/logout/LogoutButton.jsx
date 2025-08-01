import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./LogoutButton.module.css";

const LogoutButton = ({ onLogoutSuccess }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully!");

    if (onLogoutSuccess) {
      onLogoutSuccess();
    }

    navigate("/signin");
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Logout
    </button>
  );
};

export default LogoutButton;
