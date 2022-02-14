import InsertCommentIcon from "@material-ui/icons/InsertComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import TollIcon from "@material-ui/icons/Toll";
import React from "react";
import userLogo from "../assets/user.png";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__img">
          <img src={userLogo} alt="user" />
        </div>
        <div className=" sidebar__header__btn">
          <TollIcon />
          <InsertCommentIcon />
          <MoreVertIcon />
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__search__input">
          <SearchIcon />
          <input type="text" name="search" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
