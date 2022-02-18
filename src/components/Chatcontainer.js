import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import Picker from "emoji-picker-react";
import firebase from "firebase/compat/app";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import "../styles/Chatcontainer.css";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const { emailID } = useParams();
  const { userName, photoURL } = chatUser;

  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("users")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
        });
      return data;
    };

    getUser();
  }, [emailID]);

  const sendMessage = (e) => {
    e.preventDefault();
    const { email, userName, photoURL } = currentUser;
    if (emailID) {
      const payload = {
        message,
        senderEmail: email,
        receiverEmail: emailID,
        timeStamp: firebase.firestore.Timestamp.now(),
      };

      try {
        // for sender
        db.collection("chats")
          .doc(payload.senderEmail)
          .collection("messages")
          .add(payload);

        // for receiver
        db.collection("chats").doc(emailID).collection("messages").add(payload);

        // for friends list
        db.collection("friendList")
          .doc(email)
          .collection("list")
          .doc(emailID)
          .set({
            email,
            userName,
            photoURL,
            message,
          });

        db.collection("friendList")
          .doc(emailID)
          .collection("list")
          .doc(email)
          .set({
            email,
            userName,
            photoURL,
            message,
          });

        setMessage("");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={photoURL} alt="user-img" />
          </div>
          <p>{userName}</p>
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
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div className="chat-input-send-btn" onClick={sendMessage}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
