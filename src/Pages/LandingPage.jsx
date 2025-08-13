import React from "react";
import Navigation from "../Components/LandingPage/Navigation";
import HeroSection from "../Components/LandingPage/HeroSection";
import FeaturesSection from "../Components/LandingPage/FeaturesSection";
import HowItWorks from "../Components/LandingPage/HowItWorks";
import TestimonialsSection from "../Components/LandingPage/TestimonialsSection";
import StatisticsSection from "../Components/LandingPage/StatisticsSection";
import BenefitsSection from "../Components/LandingPage/BenefitsSection";
import CTASection from "../Components/LandingPage/CTASection";
import ContactSection from "../Components/LandingPage/ContactSection";
import Footer from "../Components/LandingPage/Footer";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <StatisticsSection />
      <BenefitsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
