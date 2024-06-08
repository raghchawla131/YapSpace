import React from "react";
import "./SearchedProfile.css";

const SearchedProfile = ({ profile }) => {
  return (
    <div className="searched-profile">
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
