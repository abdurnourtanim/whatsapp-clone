import InsertCommentIcon from "@material-ui/icons/InsertComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import TollIcon from "@material-ui/icons/Toll";
import React, { useEffect, useState } from "react";
import userImg from "../assets/user.png";
import db from "../firebase";
import "../styles/Sidebar.css";
import Profile from "./Profile";

const Sidebar = ({ currentUser, logout }) => {
  const [allUser, setAllUser] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getAllUser = async () => {
      const data = db.collection("users").onSnapshot((snapshot) => {
        setAllUser(
          snapshot.docs.filter((doc) => doc.data.email !== currentUser.email)
        );
      });
      return data;
    };
    getAllUser();
  }, [currentUser]);

  // eslint-disable-next-line array-callback-return
  const searchedUser = allUser.filter((user) => {
    if (
      searchInput &&
      user.data().userName.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return user;
    }
  });

  const searchItem = searchedUser.map((user) => {
    return (
      <Profile
        name={user.data().userName}
        photoURL={user.data().photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__img" onClick={logout}>
          <img src={currentUser?.photoURL} alt="user" />
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
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar__chat__list">
        {searchItem.length > 0 ? (
          searchItem
        ) : (
          <Profile
            name="Jone Doe"
            photoURL={userImg}
            lastMessage="Hello World!"
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
