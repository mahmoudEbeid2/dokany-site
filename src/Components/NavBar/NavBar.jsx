import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo/Logo";
import "./NavBar.css";

function NavBar() {
  const { cart, watchlist, } = useSelector((state) => state.user);
  // const { sellerInfo } = useSelector((state) => state.seller);

  // console.log("userInfo", userInfo);
  const token = localStorage.getItem("token");

  // Calculate total unique products in cart
  const cartItemsCount = cart.length;

  // Calculate total unique products in watchlist
  const watchlistItemsCount = watchlist.length;

  // if(!sellerInfo){
  //   return null;
  // }

  return (
    <div>
      <nav className="navbar navbar-expand-sm ">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <Logo variant="navbar" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav my-0 py-0 pm-0 mb-0 mt-0  m-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"shoppage"}>
                  Shop
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to={"contact"}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <ul className="d-flex navbar-nav">
              {
                token ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/myaccount" className="nav-link">
                        <i className="bi bi-person-circle"></i>
                      </NavLink>
                    </li>
                    <li className="nav-item icons">
                      <NavLink to="/favorites" className="nav-link d-flex align-items-center">
                        <i className="bi bi-heart"></i>
                        {watchlistItemsCount > 0 && (
                          <span className="cart-count">{watchlistItemsCount}</span>
                        )}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/cart"
                        className="nav-link d-flex align-items-center"
                      >
                        <i className="bi bi-bag"></i>
                        {cartItemsCount > 0 && (
                          <span className="cart-count">{cartItemsCount}</span>
                        )}
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/signin"
                        className="nav-link  btn-primary2"
                      >
                        {/* <i class="bi bi-box-arrow-in-right"></i> */}
                        login
                      </NavLink>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
