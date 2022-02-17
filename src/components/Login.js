import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google-logo.png";
import whatsappLogo from "../assets/logo.png";
import db, { auth, googleProvider } from "../firebase";
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        const newUser = {
          userName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
        };
        navigate("/");
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        db.collection("users").doc(res.user.email).set(newUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <img className="login-logo" src={whatsappLogo} alt="whatsapp-Logo" />
        <p className="login-name">WhatsApp Web</p>
        <button className="login-btn" onClick={signInWithGoogle}>
          <img src={googleLogo} alt="login with google" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
