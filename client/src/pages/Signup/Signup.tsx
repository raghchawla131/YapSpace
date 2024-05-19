import React, { ChangeEvent, useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

interface AuthData {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [authData, setAuthData] = useState<AuthData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [e.target.name]: e.target.value,
    }));    
  };

  return (
    <>
      <div className="signup-form">
        <div className="signup-form__container">
          <input
            className="signup-form__input"
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className="signup-form__input"
            onChange={handleChange}
            type="text"
            placeholder="Password"
            name="password"
          />
          <button className="signup-form__btn">Log in</button>
        </div>
        <p className="signup-form__text">
          Already have an account? <Link to="/login">login</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
