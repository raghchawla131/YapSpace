import React from "react";
import logo from "../../assets/yapspace logo.svg"
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar__logo--container">
          <img className="navbar__logo" src={logo} alt="" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
