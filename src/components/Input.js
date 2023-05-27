import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Input(props) {
  const navigate = useNavigate(); 
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSendMessage(text);
    setText("");
  };

const handleLogout = () => {
  navigate("/");
}

  return (
    <div className="Input">
      <form className="formInput" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <button>Send</button>
        <button onClick={handleLogout} className="submit-btn">Logout</button>
        </form>
    </div>
  );
}

export default Input;
