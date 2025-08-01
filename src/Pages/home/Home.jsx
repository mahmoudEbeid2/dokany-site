import React from "react";
import Products from "../../Components/products/products/Products";
import JustIn from "../../Components/products/justIn/JustIn";
import BestSellers from "../../Components/products/bestSellers/BestSellers";
import CategoryCard from "../../Components/categoryCard/CategoryCard";
import HeroSection from "../../Components/HeroSection/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryCard />
      <Products />
      <JustIn />
      <BestSellers />
    </>
  );
}
