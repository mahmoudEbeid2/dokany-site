import React from "react";
import Products from "../../Components/products/products/Products";
import JustIn from "../../Components/products/justIn/JustIn";
import BestSellers from "../../Components/products/bestSellers/BestSellers";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Categories from "../../Components/Categories/Categories";
import Lazyload from "../../Components/Lazyload";

export default function Home() {
  const subdomain = window.location.hostname.split(".")[0];

  return (
    <>
      <HeroSection />

      <Lazyload>
        <Categories subdomain={subdomain} />
      </Lazyload>

      <Lazyload>
        <Products subdomain={subdomain} />
      </Lazyload>

      <Lazyload>
        <JustIn subdomain={subdomain} />
      </Lazyload>

      <Lazyload>
        <BestSellers subdomain={subdomain} />
      </Lazyload>
    </>
  );
}
