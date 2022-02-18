import React from "react";
import "../styles/Chat.css";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";

const Chat = ({ currentUser, logOut }) => {
  return (
    <div className="chat">
      <div className="chat__container">
        <Sidebar currentUser={currentUser} logOut={logOut} />
        <ChatContainer currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Chat;
