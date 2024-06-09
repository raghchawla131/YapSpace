import React from "react";
import "./SearchedProfile.css";
import { useNavigate } from "react-router-dom";

const SearchedProfile = ({ profile }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${profile.user_id}/${profile.username}`);
  };

  return (
    <div className="searched-profile" onClick={handleClick}>
      <div className="searched__profile-picture">
        <img
          src={profile.profile_pic_url}
          alt="profile"
          className="searched__profile-image"
        />
      </div>
      <div className="searched__profile-info">
        <h3 className="searched__profile-username">{profile.name}</h3>
        <p className="searched__profile-bio">@{profile.username}</p>
      </div>
    </div>
  );
};

export default SearchedProfile;
