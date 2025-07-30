import "./App.css";
import SupportSection from "./Components/SupportCard/SupportSection";
import ReviewsSection from "./Components/ReviewSection/ReviewsSection";
import ShopPage from "../pages/ShopPage/ShopPage";

function App() {
  return (
    <>
      <ShopPage />
      <SupportSection />
      <ReviewsSection />
    </>
  );
}

export default App;
