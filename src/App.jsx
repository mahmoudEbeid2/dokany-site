import "./App.css";
import SupportSection from "./Components/SupportCard/SupportSection";
import ReviewsSection from "./Components/ReviewSection/ReviewsSection";
import ShopPage from "../pages/ShopPage/ShopPage";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast-custom.css";
import Orders from "./Components/Orders/Orders";

function App() {
  return (
    <>
      <Cart />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Orders />
    </>
  );
}

export default App;
