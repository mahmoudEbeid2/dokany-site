import React, { useState } from "react";
import Terms from "./Terms";
import PrivacyPolicy from "./PrivacyPolicy";
import Cookies from "./Cookies";
import Sitemap from "./Sitemap";
import "./LegalPages.css";

const LegalPages = () => {
  const [activeTab, setActiveTab] = useState("terms");

  const tabs = [
    { id: "terms", label: "Terms & Conditions", component: <Terms /> },
    { id: "privacy", label: "Privacy Policy", component: <PrivacyPolicy /> },
    { id: "cookies", label: "Cookies Policy", component: <Cookies /> },
    { id: "sitemap", label: "Sitemap", component: <Sitemap /> }
  ];

  return (
    <div className="legal-pages-container">
      <div className="legal-header">
        <h1>Legal Information</h1>
        <p>Access all legal documents and website information</p>
      </div>

      <div className="tabs-container">
        <div className="tabs-navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default LegalPages;
