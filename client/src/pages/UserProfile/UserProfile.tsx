import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import axios from "axios";


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
  setUserInfo: React.Dispatch<React.SetStateAction<UserData | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:8000/api/user/info", {
      user_id,
    });
    setUserInfo(res.data);
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
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user_id) {
      fetchUserData(parseInt(user_id), setUserInfo, setLoading);
    }
  }, [user_id, username]);

  return (
    <>
      <div className="user-profile">
        {loading ? (
          <p>Loading...</p>
        ) : userInfo ? (
          <>
            <div className="profile">
              <div className="profile__info">
                <div className="profile__info-container">
                  <div className="profile__info-header">
                    <h1 className="profile__info-name">{userInfo.name}</h1>
                    <p className="profile__info-username">
                      {userInfo.username}
                    </p>
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
                  <button className="profile__info-edit-profile-btn">
                    Edit profile
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
