import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../../context/authContext";
import "./CreatePost.css";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";

const CreatePost: React.FC = () => {
  const { currentUser } = useContext(authContext);
  const { userInfo, fetchUserInfo } = useContext(userContext);

  const [yapText, setYapText] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYapText(e.target.value);
  };

  const handleYapPost = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/yap/create_yap", {
        yapText: yapText,
        user_id: currentUser,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo(currentUser);
  }, [currentUser]);

  const handleCloseClick = () => {
    navigate("/");
  };

  return (
    <div className="new-yap">
      <header className="new-yap__header">
        <div onClick={handleCloseClick} className="new-yap__back">
          <IoClose className="new-yap__back--btn" />
        </div>
        <h3 className="new-yap__title">New yap</h3>
      </header>
      {userInfo && (
        <main className="new-yap__body">
          <div className="new-yap__left">
            <img
              src={(userInfo as { profile_pic_url: string }).profile_pic_url}
              alt=""
              className="new-yap__profile--img"
            />
          </div>
          <div className="new-yap__right">
            <div className="new-yap__username">
              {(userInfo as { username: string }).username}
            </div>
            <form className="new-yap__form">
              <input
                className="new-yap__form-textarea"
                type="text"
                placeholder="What's new?"
                onChange={handleChange}
              />
            </form>
          </div>
        </main>
      )}
      <footer className="new-yap__footer">
        <p className="new-yap__footer--text">Anyone can reply and yap</p>
        <button className="new-yap__footer--btn" onClick={handleYapPost}>
          Post
        </button>
      </footer>
    </div>
  );
};

export default CreatePost;
