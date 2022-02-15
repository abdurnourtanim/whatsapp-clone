import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import Picker from "emoji-picker-react";
import React, { useState } from "react";
import userImg from "../assets/user.png";
import "../styles/Chatcontainer.css";
import ChatMessage from "./ChatMessage";

const Chatcontainer = () => {
  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);

  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={userImg} alt="user-img" />
          </div>
          <p>Jhon Doe</p>
        </div>

        <div className="chat-container-header-btn">
          <MoreVertIcon />
        </div>
      </div>

      <div className="chat-display-container">
        <ChatMessage
          message="Hello,This is a test message!"
          time="22-02-2022"
        />
        <ChatMessage
          message="Hello,This is a test message!"
          time="22-02-2022"
        />
        <ChatMessage
          message="Hello,This is a test message!"
          time="22-02-2022"
        />
      </div>
      <div className="chat-input">
        {openEmoji && (
          <Picker
            onEmojiClick={(event, emojiObject) =>
              setMessage(message + emojiObject.emoji)
            }
            lick
          />
        )}
        <div className="chat-input-btn">
          <InsertEmoticonIcon onClick={() => setOpenEmoji(!openEmoji)} />
          <AttachFileIcon />
        </div>
        <form>
          <input
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div className="chat-input-send-btn">
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default Chatcontainer;
