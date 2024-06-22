import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import "./Profile.css";
import Yap from "../../components/yap/Yap";
import { signup } from "../../../../server/controllers/auth";
import { userContext } from "../../context/userContext";
import { authContext } from "../../context/authContext";

interface EditProfileData {
  name: string;
  bio: string;
}

const Profile = () => {
  const { currentUser } = useContext(authContext) || {};
  const { userInfo, fetchUserInfo } = useContext(userContext);

  const [showPopUp, setShowPopUp] = useState(false);
  const [editProfileData, setEditProfileData] = useState<EditProfileData>({
    name: "",
    bio: "",
  });

  useEffect(() => {
    fetchUserInfo(currentUser);
  }, [currentUser]);

  const toggleEditProfile = () => {
    setShowPopUp(!showPopUp);
  };

  const handlePopupClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditProfileData({
      ...editProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Call the API to update the user's profile
  };

  return (
    <>
      {userInfo && (
        <div className="profile">
          <div className="profile__info">
            <div className="profile__info-container">
              <div className="profile__info-header">
                <h1 className="profile__info-name">{userInfo.name}</h1>
                <p className="profile__info-username">{userInfo.username}</p>
              </div>
              <div className="profile__info-img-container">
                <img
                  className="profile__info-img"
                  src={userInfo.profile_pic_url || "default_image_url"}
                  alt=""
                />
              </div>
            </div>
            <div className="profile__info-bio">
              <p>{userInfo.bio}</p>
            </div>
            <div className="profile__info-followers">
              <img
                className="profile__info-followers-img"
                src="https://images.unsplash.com/photo-1702838834593-5d1bbab96706?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <p className="profile__info-followers-cnt">50 followers</p>
            </div>
            <div className="profile__info-edit-profile">
              <button
                onClick={toggleEditProfile}
                className="profile__info-edit-profile-btn"
              >
                Edit profile
              </button>
            </div>
          </div>
          <div className="profile__posts"></div>
        </div>
      )}
      <div>
        {currentUser && (
          <div className="yap-list">
            <Yap profileUserId={currentUser} />
          </div>
        )}
      </div>
      {showPopUp && (
        <div onClick={toggleEditProfile} className="popup-backdrop">
          <div onClick={handlePopupClick} className="popup">
            <form onSubmit={handleSubmit} className="popup__form">
              <div className="popup__form-group">
                <label className="popup__label">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="popup__input"
                  onChange={handleFormChange}
                />
              </div>
              <div className="popup__form-group">
                <label className="popup__label">Bio</label>
                <input
                  type="text"
                  placeholder="Write a bio..."
                  name="bio"
                  className="popup__input"
                  onChange={handleFormChange}
                />
              </div>
              <button className="popup__btn" type="submit">
                Done
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
