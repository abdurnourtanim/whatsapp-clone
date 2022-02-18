import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = ({ name, photoURL, email }) => {
  const navigate = useNavigate();
  const goToUser = (emailID) => {
    if (emailID) {
      navigate(`/${emailID}`);
    }
  };

  return (
    <div className="user__profile" onClick={() => goToUser(email)}>
      <div className="user__image">
        <img src={photoURL} alt="user-img" />
      </div>

      <div className="user__info">
        <p className="user__name">{name}</p>
        <p className="user__lastmessage">Hello,This is test message!</p>
      </div>
    </div>
  );
};

export default Profile;
