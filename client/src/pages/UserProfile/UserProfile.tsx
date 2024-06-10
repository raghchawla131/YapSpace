import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../context/authContext";
import { userContext } from "../../context/userContext";


interface UserData {
  user_id: string;
  email: string;
  password_hash: string;
  username: string;
  profile_pic_url: string;
  bio: string;
  name: string;
}

// React.Dispatch -> a function which can update state
// React.SetStateAction -> type of state updater function
const fetchUserData = async (
  user_id: number,
  setSearchedUserInfo: React.Dispatch<React.SetStateAction<UserData | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:8000/api/user/info", {
      user_id,
    });
    setSearchedUserInfo(res.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const UserProfile: React.FC = () => {
  const { user_id, username } = useParams<{
    user_id: string;
    username: string;
  }>();
  const [searchedUserInfo, setSearchedUserInfo] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  
  useEffect(() => {
    if (user_id) {
      fetchUserData(parseInt(user_id), setSearchedUserInfo, setLoading);
    }
  }, [user_id, username]);
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  }

  return (
    <>
      <div className="user-profile">
        {loading ? (
          <p>Loading...</p>
        ) : searchedUserInfo ? (
          <>
            <div className="profile">
              <div className="profile__info">
                <div className="profile__info-container">
                  <div className="profile__info-header">
                    <h1 className="profile__info-name">{searchedUserInfo.name}</h1>
                    <p className="profile__info-username">
                      {searchedUserInfo.username}
                    </p>
                  </div>
                  <div className="profile__info-img-container">
                    <img
                      className="profile__info-img"
                      src={searchedUserInfo.profile_pic_url || "default_image_url"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="profile__info-bio">
                  <p>{searchedUserInfo.bio}</p>
                </div>
                <div className="profile__info-followers">
                  <img
                    className="profile__info-followers-img"
                    src="https://images.unsplash.com/photo-1702838834593-5d1bbab96706?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <p className="profile__info-followers-cnt">50 followers</p>
                </div>
                <div className="profile__info-follow">
                  <button onClick={handleFollowToggle} className={`profile__info-follow-btn profile__info-follow-btn--${isFollowing ? "unfollow" : "follow"}`}>
                    <p className={`profile__info-follow-btn-text--${isFollowing ? "unfollow" : "follow"}`}>{isFollowing ? "Unfollow" : "Follow"}</p>
                  </button>
                </div>
              </div>
              <div className="profile__posts"></div>
            </div>
          </>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </>
  );
};

export default UserProfile;
