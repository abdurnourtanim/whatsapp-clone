import InsertCommentIcon from "@material-ui/icons/InsertComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TollIcon from "@material-ui/icons/Toll";
import React from "react";
import userLogo from "../assets/user.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__img">
          <img src={userLogo} alt="user" />
        </div>
        <div className="sidebar__header__btn">
          <TollIcon />
          <InsertCommentIcon />
          <MoreVertIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
