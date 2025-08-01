import React from "react";
import Products from "../../Components/products/products/Products";
import JustIn from "../../Components/products/justIn/JustIn";
import BestSellers from "../../Components/products/bestSellers/BestSellers";

export default function Home() {
  return (
    <>
      <Products />
      <JustIn />
      <BestSellers />
    </>
  );
}
