import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../context/authContext";

interface AuthData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [authData, setAuthData] = useState<AuthData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const{login} = useContext(authContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      login(authData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-form__container">
          <input
            className="login-form__input"
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className="login-form__input"
            onChange={handleChange}
            type="text"
            placeholder="Password"
            name="password"
          />
          <button className="login-form__btn" type="submit">
            Log in
          </button>
        </div>
        <p className="login-form__text">
          Don't have an account? <Link to="/signup">Singup</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
