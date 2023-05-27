import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [username, setUsername] = useState("");

    const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
g
  const navigate = useNavigate();


const handleSubmit = () => {
  if (username.trim() === "") {
    alert("Please enter a username");
    return;
  }
  console.log("Username:", username);
  navigate("/messages", { state: { username,  } });

};
  return (
    <div>
      <h1 className="App-header">Welcome to Chatty</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </div>
          <button type="button" onClick={handleSubmit}>Login</button>
      </form>
      </div>
  );
}
export default Homepage;
