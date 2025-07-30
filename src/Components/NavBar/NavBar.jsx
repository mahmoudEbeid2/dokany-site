import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.css"

function NavBar() {
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
          <NavLink className="nav-link" to={"product"} >Product</NavLink>
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
            <i className="bi bi-bag"></i>
            <span className="cart-count">2</span>
        </li>
      </ul>
    </div>
  </div>
</nav>
      
    </div>
  )
}

export default NavBar
