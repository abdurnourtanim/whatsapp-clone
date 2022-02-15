import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState();

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
