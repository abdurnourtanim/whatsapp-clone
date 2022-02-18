import React from "react";
import logo from "../assets/logo.png";
import "../styles/Home.css";
import Sidebar from "./Sidebar";

const Home = ({ currentUser, logOut }) => {
  return (
    <div className="home">
      <div className="home__container">
        <Sidebar currentUser={currentUser} logOut={logOut} />
        <div className="home__bg">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
