import React, { useState, useEffect } from "react";
import Input from "./Input";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { AvatarGenerator } from 'random-avatar-generator';

function Messages() {
  const location = useLocation();
  const generator = new AvatarGenerator();
  const { username } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: username,
    avatar: generator.generateRandomAvatar(),
  });
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [disconnectedUser, setDisconnectedUser] = useState("");
  const [joinedUser, setJoinedUser] = useState("");
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    const drone = new window.Scaledrone("ePz9WHYUnemvl8XN", {
      data: member,
    });
    setDrone(drone);

    return () => {
      drone.close();
    }
  }, [member]);

  useEffect(() => {
    if (drone) {
      drone.on("open",  (error) => {
        if (error) {
          return console.error(error);
        }
        console.log('Successfully connected to Scaledrone');
        member.id = drone.clientId;
        setMember(member);
      });
      
      const room = drone.subscribe("observable-room");
      room.on("data", (data, member) => {
        setMessages((prevArray) => [...prevArray, { member, text: data }]);
      });

      room.on('members', members => {
        setOnlineMembers(members);
      });

      room.on('member_join', member => {
        setOnlineMembers(prevMembers => [...prevMembers, member]);
        setJoinedUser(member.clientData.username);
      });

      room.on('member_leave', member => {
        setOnlineMembers(prevMembers => prevMembers.filter(m => m.id !== member.id));
        setDisconnectedUser(member.clientData.username);

      });
    }
  }, [drone, member]);

const onSendMessage = (message) => {
  try {
    drone.publish({
      room: "observable-room",
      message: message,
    });
  } catch (e) {
    alert("Enter your message");
  }
};



  const renderMessage = (message, index, currentMember) => {
    const { member, text } = message;
    
    let className = null;
    if (member.id === currentMember.id) {
      className = "Messages-message";
    } else {
      className = "Messages-message anotherMember";
    }
    return (
      <li key={index} className={className}>
        <span
          className="avatar">
            <img src={member.clientData.avatar}/>
          </span>  
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };



  return (
    <div className="App">
      <Header />
      <div className="Online-count">Online members: {onlineMembers.length}
      {disconnectedUser && <span className="Disconnected-message">{disconnectedUser} left the room</span>}
      {joinedUser && <div className="joined-message">{joinedUser} join the room</div>}
      </div>
     
      <ul className="Messages-list" >
        {messages?.map((message, index) =>
          renderMessage(message, index, member)
        )}
      </ul>
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}


export default Messages;