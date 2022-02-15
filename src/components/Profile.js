import React from "react";
import "../styles/Profile.css";

const Profile = ({ name, photoURL, lastMessage }) => {
  return (
    <div className="user__profile">
      <div className="user__image">
        <img src={photoURL} alt="user-img" />
      </div>

      <div className="user__info">
        <p className="user__name">{name}</p>
        <p className="user__lastmessage">{lastMessage}</p>
      </div>
    </div>
  );
};

export default Profile;
