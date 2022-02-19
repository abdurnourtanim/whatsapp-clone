import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import Picker from "emoji-picker-react";
import firebase from "firebase/compat/app";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import userImg from "../assets/user.png";
import db from "../firebase";
import "../styles/Chatcontainer.css";
import ChatMessage from "./ChatMessage";

const ChatContainer = ({ currentUser }) => {
  const [message, setMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const { emailID } = useParams();

  const chatBox = useRef(null);

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

    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          const messages = snapshot.docs.map((doc) => doc.data());
          const newMessages = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailID) ||
              message.receiverEmail === (currentUser.email || emailID)
          );
          setChatMessages(newMessages);
        });
      return data;
    };

    getUser();
    getMessages();
  }, [emailID, currentUser]);

  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (e) => {
      const { currentTarget } = e;
      currentTarget.scroll({
        top: currentTarget.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [message]);

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
            <img src={chatUser?.photoURL || userImg} alt="user-img" />
          </div>
          <p>{chatUser?.userName || "undefined"}</p>
        </div>

        <div className="chat-container-header-btn">
          <MoreVertIcon />
        </div>
      </div>

      <div className="chat-display-container" ref={chatBox}>
        {chatMessages.map((message) => (
          <ChatMessage
            key={message.message}
            message={message.message}
            time={message.timeStamp}
            sender={message.senderEmail}
          />
        ))}
      </div>
      <div className="chat-input">
        {openEmoji && (
          <Picker
            onEmojiClick={(e, emojiObject) =>
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
