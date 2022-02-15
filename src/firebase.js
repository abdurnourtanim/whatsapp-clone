import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBf1Kw49vRPnBLMABBqWT_LIXLfohfjxpc",
  authDomain: "whatsapp-clone-9ae96.firebaseapp.com",
  projectId: "whatsapp-clone-9ae96",
  storageBucket: "whatsapp-clone-9ae96.appspot.com",
  messagingSenderId: "845724915590",
  appId: "1:845724915590:web:b46e9b9f0b10c082bc3e07",
  measurementId: "G-NG43TESEBL",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GithubAuthProvider();

export { auth, googleProvider };
export default db;
