import React, { useContext, useEffect, useState } from "react";
import "./AddComment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { authContext } from "../../context/authContext";
import { userContext } from "../../context/userContext";

const AddComment: React.FC = () => {
  const { currentUser } = useContext(authContext) ?? {};
  const { userInfo, fetchUserInfo } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id, username, profile_pic_url, content } = location.state as {
    user_id: number;
    username: string;
    profile_pic_url: string;
    content: string;
  };

  const [commentText, setCommentText] = useState("");

  const handleCloseClick = () => {
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentPost = async () => {
    // Implement the function to post a comment
  };

  useEffect(() => {
    fetchUserInfo(currentUser);
  }, [currentUser]);

  return (
    <>
      <div className="add-comment">
        <header className="add-comment__header">
          <div onClick={handleCloseClick} className="add-comment__back">
            <IoClose className="add-comment__back--btn" />
          </div>
          <h3 className="add-comment__title">Reply</h3>
        </header>

        <section className="yap-to-comment__body">
          <div className="yap-to-comment__left">
            <img
              src={profile_pic_url}
              alt=""
              className="yap-to-comment__profile--img"
            />
          </div>
          <div className="yap-to-comment__right">
            <div className="yap-to-comment__username">{username}</div>
            <div className="yap-to-comment__content">{content}</div>
          </div>
        </section>

        {userInfo && (
          <main className="add-comment__body">
            <div className="add-comment__left">
              <img
                src={userInfo.profile_pic_url}
                alt=""
                className="add-comment__profile--img"
              />
            </div>
            <div className="add-comment__right">
              <div className="add-comment__username">{userInfo.username}</div>
              <form className="add-comment__form">
                <input
                  className="add-comment__form-textarea"
                  type="text"
                  placeholder={`${userInfo.username}, what do you think?`}
                  autoFocus
                  onChange={handleChange}
                />
              </form>
            </div>
          </main>
        )}

        <footer className="add-comment__footer">
          <p className="add-comment__footer--text">Anyone can reply and yap</p>
          <button
            className="add-comment__footer--btn"
            onClick={handleCommentPost}
          >
            Post
          </button>
        </footer>
      </div>
    </>
  );
};

export default AddComment;
