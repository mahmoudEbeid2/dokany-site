import React from "react";
import Products from "../../Components/products/products/Products";
import JustIn from "../../Components/products/justIn/JustIn";
import BestSellers from "../../Components/products/bestSellers/BestSellers";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Categories from "../../Components/Categories/Categories";

export default function Home() {
  const subdomain = window.location.hostname.split(".")[0];
  console.log(subdomain);

  return (
    <>
      <HeroSection />
      <Categories subdomain={subdomain} />
      <Products subdomain={subdomain} />
      <JustIn subdomain={subdomain} />
      <BestSellers subdomain={subdomain} />
    </>
  );
}
