import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="login-form">
        <div className="login-form__container">
          <input className="login-form__input" type="text" placeholder="Email" />
          <input className="login-form__input" type="text" placeholder="Password" />
          <button className="login-form__btn">Log in</button>
        </div>
        <p className="login-form__text">Don't have an account? <Link to="/signup">Singup</Link></p>
      </div>
    </>
  );
};

export default Login;
