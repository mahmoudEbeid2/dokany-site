import React from "react";
import Products from "../../components/products/products/Products";
import JustIn from "../../components/products/justIn/JustIn";
import BestSellers from "../../components/products/bestSellers/BestSellers";

export default function Home() {
  return (
    <>
      <Products />
      <JustIn />
      <BestSellers />
    </>
  );
}
