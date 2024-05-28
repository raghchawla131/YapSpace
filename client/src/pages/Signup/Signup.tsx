import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

interface AuthData {
  email: string;
  password: string;
  username: string;
}

interface Errors {
  email?: string;
  password?: string;
}

const Signup: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [authData, setAuthData] = useState<AuthData>({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const {signup} = useContext(authContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [e.target.name]: e.target.value,
    }));

    setErrors({});
  };

  // const validateEmail = (email: string): boolean => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password: string): boolean => {
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  //   return passwordRegex.test(password);
  // };

  const handleNextStep = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // const { email, password } = authData;
    const newErrors: Errors = {};

    // if (!validateEmail(email)) {
    //   newErrors.email = "Invalid email";
    // }
    // if (!validatePassword(password)) {
    //   newErrors.password =
    //     "Password must contain at least 8 characters, one uppercase letter and one number";
    // }
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setStep(2);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signup(authData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {step === 1 && (
          <form className="signup-form" onSubmit={handleNextStep}>
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
              {/* {errors.email && <p className="signup-form__error">{errors.email}</p>}
              {errors.password && <p className="signup-form__error">{errors.password}</p>} */}
              <button className="signup-form__btn" type="submit">
                Next
              </button>
            </div>
            <p className="signup-form__text">
              Already have an account? <Link to="/login">login</Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <form className="signup-form" onSubmit={handleSignup}>
            <div className="signup-form__container">
              <input
                className="signup-form__input"
                onChange={handleChange}
                type="text"
                placeholder="Username"
                name="username"
              />
              <button className="signup-form__btn" type="submit">
                Sign up
              </button>
            </div>
            <p className="signup-form__text">
              Already have an account? <Link to="/login">login</Link>
            </p>
          </form>
        )}
      </div>
    </>
  );
};

export default Signup;
