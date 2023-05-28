import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("#000000");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username.trim() === "") {
      alert("Please enter a username");
      return;
    }
    console.log("Username:", username);
    navigate("/messages", { state: { username, color } });
  };

  return (
    <div className="page-container">
      <div className="border-container">
        <header className="App-header">
          <h1 className="header-text">Welcome to Chatty</h1>
        </header>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Pick a color: </label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={handleColorChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
  Login
</button>

        </form>
      </div>
      <footer className="footer-container">
        <p>&copy; 2023 Robert Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
