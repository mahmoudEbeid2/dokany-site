import React from "react";
import "./Cookies.css";

const Cookies = () => {
  return (
    <div className="cookies-container">
      <div className="cookies-content">
        <h1>Cookie Policy</h1>
        
        <section className="cookies-section">
          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
          </p>
        </section>

        <section className="cookies-section">
          <h2>How We Use Cookies</h2>
          <p>Dokany uses cookies for several purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly</li>
            <li><strong>Performance Cookies:</strong> These cookies collect information about how visitors use our website</li>
            <li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make</li>
            <li><strong>Targeting Cookies:</strong> These cookies are used to deliver relevant advertisements</li>
          </ul>
        </section>

        <section className="cookies-section">
          <h2>Types of Cookies We Use</h2>
          
          <h3>Session Cookies</h3>
          <p>
            These are temporary cookies that remain in your browser's cookie file until you leave the website. They are used to maintain your session and remember your preferences during your visit.
          </p>

          <h3>Persistent Cookies</h3>
          <p>
            These cookies remain in your browser's cookie file for a longer period of time. They are used to remember your preferences and settings for future visits.
          </p>

          <h3>Third-Party Cookies</h3>
          <p>
            Some cookies are placed by third-party services that appear on our pages. These services may include analytics, advertising, and social media platforms.
          </p>
        </section>

        <section className="cookies-section">
          <h2>Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
          </p>
          <p>To learn more about managing cookies, visit:</p>
          <ul>
            <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
            <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">Your Online Choices</a></li>
          </ul>
        </section>

        <section className="cookies-section">
          <h2>Browser Settings</h2>
          <p>You can manage cookies through your browser settings:</p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and stored data</li>
          </ul>
        </section>

        <section className="cookies-section">
          <h2>Impact of Disabling Cookies</h2>
          <p>
            Please note that if you choose to disable cookies, some features of our website may not function properly. This may affect your user experience and the functionality of certain services.
          </p>
        </section>

        <section className="cookies-section">
          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
          </p>
        </section>

        <div className="cookies-footer">
          <p>Last updated: January 2024</p>
          <p>For questions about our Cookie Policy, please contact us at privacy@dokany.com</p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
