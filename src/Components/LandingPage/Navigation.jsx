import React from "react";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        {/* Improved Logo Section with Bootstrap */}
        <div className="navbar-brand d-flex align-items-center">
          <div className="d-flex align-items-center">
            <div
              className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "40px", height: "40px" }}
            >
              <span className="text-white fw-bold fs-5">🏪</span>
            </div>
            <span className="fw-bold text-dark fs-4">Dockany</span>
          </div>
        </div>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#landingNavbar"
          aria-controls="landingNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="landingNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="#features" className="nav-link fw-semibold px-3">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#how-it-works" className="nav-link fw-semibold px-3">
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a href="#testimonials" className="nav-link fw-semibold px-3">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a href="#pricing" className="nav-link fw-semibold px-3">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact-us" className="nav-link fw-semibold px-3">
                Contact
              </a>
            </li>
          </ul>

          <div className="d-flex">
            <a
              href="#get-started"
              className="btn btn-primary px-4 py-2 fw-semibold"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
