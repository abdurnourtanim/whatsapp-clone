import React from "react";
import "../styles/Chat.css";
import Chatcontainer from "./Chatcontainer";
import Sidebar from "./Sidebar";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__container">
        <Sidebar />

        <Chatcontainer />
      </div>
    </div>
  );
};

export default Chat;
