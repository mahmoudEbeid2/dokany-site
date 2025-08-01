import React from "react";
import Products from "../../Components/products/products/Products";
import JustIn from "../../Components/products/justIn/JustIn";
import BestSellers from "../../Components/products/bestSellers/BestSellers";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Categories from "../../Components/Categories/Categories";


export default function Home() {
  return (
    <>
      <HeroSection />
    <Categories/>
      <Products />
      <JustIn />
      <BestSellers />
    </>
  );
}
