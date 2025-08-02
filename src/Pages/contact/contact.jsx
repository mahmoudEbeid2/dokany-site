import React from "react";
import styles from "./contact.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {sellerInfo} = useSelector((state) => state.seller);

  const subdomain = window.location.hostname.split(".")[0];
  function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    fetch(`${import.meta.env.VITE_API}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        subdomain: subdomain,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("✅ Message sent successfully.");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Failed to send message.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if(!sellerInfo){
    return <Loader/>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headline}>Get In Touch</h1>
        <p className={styles.subtitle}>
          Have a question or need assistance? We'd love to hear from you.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfoSection}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <div className={styles.contactInfoContainer}>
            <div className={styles.contactInfo}>
              <div className={styles.iconWrapper}>
                <i className={`bi bi-telephone ${styles.icon}`}></i>
              </div>
              <div className={styles.contactDetails}>
                <h3 className={styles.contactTitle}>Phone Number</h3>
                <p className={styles.contactMethod}>{sellerInfo.phone}</p>
              </div>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.iconWrapper}>
                <i className={`bi bi-envelope ${styles.icon}`}></i>
              </div>
              <div className={styles.contactDetails}>
                <h3 className={styles.contactTitle}>Email Address</h3>
                <p className={styles.contactMethod}>{sellerInfo.email}</p>
              </div>
            </div>


          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Send Us a Message</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                <i className="bi bi-person"></i>
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="Enter your full name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                <i className="bi bi-envelope"></i>
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Enter your email address"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                <i className="bi bi-chat-text"></i>
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                placeholder="Tell us how we can help you..."
                className={styles.textarea}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="bi bi-hourglass-split"></i>
                  Sending...
                </>
              ) : (
                <>
                  <i className="bi bi-send"></i>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
