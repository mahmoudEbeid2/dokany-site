import React from "react";
import styles from "./contact.module.css";
import { useState } from "react";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, message);
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>contact</h1>
      <div className="d-flex align-items-center justify-content-between w-100 gap-5">
        <div className={`col-12 col-md-6 ${styles.contactInfo}`}>
          <i className={`bi bi-telephone ${styles.icon}}`}></i>
          <h2 className={styles.contactTitle}>phone number</h2>
          <p className={styles.contactMethod}>+201033599984</p>
        </div>
        <div className={`col-12 col-md-6 ${styles.contactInfo}`}>
          <i className={`bi bi-envelope ${styles.icon}}`}></i>
          <h2 className={styles.contactTitle}>email</h2>
          <p className={styles.contactMethod}>zTc9D@example.com</p>
        </div>
      </div>
      <form className={styles.from} onSubmit={handleSubmit}>
        <label htmlFor="name">full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          placeholder="name"
        />
        <label htmlFor="email">email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="email"
        />
        <label htmlFor="message">message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          placeholder="message"
        ></textarea>
        <button type="submit">send message</button>
      </form>
    </div>
  );
}

export default Contact;
