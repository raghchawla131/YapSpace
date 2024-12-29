import React, { useContext, useEffect, useState } from "react";
import "./AddComment.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { authContext } from "../../context/authContext";
import { userContext } from "../../context/userContext";
import axios from "axios";

const AddComment: React.FC = () => {
  const { currentUser } = useContext(authContext) ?? {};
  const { userInfo, fetchUserInfo } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { user_id, username, profile_pic_url, content, parent_comment_id = null } = location.state as {
    user_id: number;
    username: string;
    profile_pic_url: string;
    content: string;
    currentUser: number;
    parent_comment_id?: number | null;
  };
  const { yap_id, comment_id } = useParams();

  const [commentText, setCommentText] = useState("");

  const handleCloseClick = () => {
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleAddCommentOnPost = async () => {
    try {
      const data = {
        user_id: currentUser,
        content: commentText,
        yap_id: yap_id || null, // Include yap_id only if it's a root comment
        parent_comment_id: comment_id || null, // Include comment_id only if it's a nested comment
      };
  
      // Remove yap_id or parent_comment_id if not applicable
      // if (!yap_id) delete data.yap_id;
      // if (!comment_id) delete data.parent_comment_id;
  
      const res = await axios.post("http://localhost:8001/api/comment/add_comment", data);
  
      if (res.status === 200) {
        console.log("Comment added successfully");
      }
    } catch (error) {
      console.log(error);
    }
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
            onClick={handleAddCommentOnPost}
          >
            Post
          </button>
        </footer>
      </div>
    </>
  );
};

export default AddComment;
