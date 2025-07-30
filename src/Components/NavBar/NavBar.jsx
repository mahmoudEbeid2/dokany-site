import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./NavBar.css"

function NavBar() {
  const { cart } = useSelector((state) => state.user);
  
  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div>
        <nav className="navbar navbar-expand-lg ">
  <div className="container">
    <NavLink className="navbar-brand" to="/">3legant.</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0  m-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to={"/"} >Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={"shoppage"} >Shop</NavLink>
        </li>
       
        <li className="nav-item">
          <NavLink className="nav-link" to={"contact"} >Contact Us</NavLink>
        </li>
      </ul>
      <ul className="d-flex navbar-nav"  >
      <li className="nav-item">
                <NavLink to="/myaccount" className="nav-link">
                  <i className="bi bi-person-circle"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/favorites" className="nav-link">
                  <i className="bi bi-heart"></i>
                </NavLink>
              </li>
        <li className="nav-item">
            <NavLink to="/cart" className="nav-link d-flex align-items-center">
                <i className="bi bi-bag"></i>
                {cartItemsCount > 0 && (
                  <span className="cart-count">
                    {cartItemsCount}
                  </span>
                )}
            </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
      
    </div>
  )
}

export default NavBar
