import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToSearch = () => {
    navigate("/search");
  };
  const navigateToCreatePost = () => {
    navigate("/create");
  };
  const navigateToActivity = () => {
    navigate("/activity");
  };
  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="footer">
        <GrHomeRounded
          onClick={navigateToHome}
          className="footer__icon footer__home"
        />
        <IoSearch
          onClick={navigateToSearch}
          className="footer__icon footer__search"
        />
        <FaRegPenToSquare
          onClick={navigateToCreatePost}
          className="footer__icon footer__create-post"
        />
        <FaRegHeart
          onClick={navigateToActivity}
          className="footer__icon footer__activity"
        />
        <FaRegUser
          onClick={navigateToProfile}
          className="footer__icon footer__profile"
        />
      </div>
    </>
  );
};

export default Footer;
