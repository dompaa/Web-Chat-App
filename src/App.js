import { useState, useEffect } from "react";
import Input from "./Components/Input";
import Message from "./Components/Message";
import './styles/main.scss'
import logoIntro from '../src/assets/logo-intro.svg'
import logoChat from '../src/assets/logo-chat.svg'
import avatar1 from '../src/assets/avatar-1.svg'
import avatar2 from '../src/assets/avatar-2.svg'
import avatar3 from '../src/assets/avatar-3.svg'
import { Tooltip } from "@mui/material";
import nouns from "./Components/Data/nouns";
import adjectives from "./Components/Data/adjectives";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [user, setUser] = useState({
    username: '',
    randomColor: '',
    avatar: '',
    avatarId: 0
  });
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();
  const [users, setUsers] = useState();
  const [usernameSubmitted, setUsernameSubmitted] = useState(false)
  const [members, setMembers] = useState([])


  useEffect(() => {
    if (usernameSubmitted) {
      const drone = new window.Scaledrone("rRblzLikagH0ZwF8", {
        data: user,
      });
      setDrone(drone);
    }
  }, [usernameSubmitted]);


  useEffect(() => {
    if (drone) {
      drone.on("open", (error) => {
        if (error) {
          console.log("Error on connecting", error);
        }

        const chatRoom = drone.subscribe("observable-room");

        chatRoom.on("open", (error) => {
          if (error) {
            return console.error(error);
          }
          // Connected to room
        });

        chatRoom.on('members', function (members) {
          setMembers(members)
        });

        chatRoom.on('member_join', member => {
          setMembers(prevValues => [...prevValues, member])
        });

        chatRoom.on('member_leave', ({ id }) => {
          setMembers(prevValues => prevValues.filter(v => v.id !== id))
        });

        chatRoom.on("data", (text, chatUser) => {
          setUsers(drone.clientId);


          const username = chatUser.clientData.username;
          const chatUserID = chatUser.id;
          const userColor = chatUser.clientData.randomColor
          const userAvatar = chatUser.clientData.avatar
          const timeStamp = new Date()

          setMessages((oldArray) => [
            ...oldArray,
            { text, username, userColor, chatUserID, user, timeStamp, userAvatar },
          ]);
        });
      });
    }
  }, [drone])


  const onSendMessage = (message) => {
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  const handleUsername = (e) => {
    setUser(prevValues => ({
      ...prevValues, username: e.target.value
    }))
  }

  const submitUsername = () => {
    setUsernameSubmitted(true)
  }

  const handleAvatar = (avatar) => {
    let userAvatar

    switch (avatar) {
      case 1: userAvatar = avatar1; 
      break;
      case 2: userAvatar = avatar2; 
      break;
      default: userAvatar = avatar3; 
      break;
    }

    if (user.avatarId === avatar) {
      setUser(prevValues => ({ ...prevValues, avatar: '', avatarId: 0 }))
      return
    }

    setUser(prevValues => ({ ...prevValues, avatar: userAvatar, avatarId: avatar }))
  }


  return (
    <div className="App">
      {
        usernameSubmitted ?
          <div className="chat-screen">
            <header>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={logoChat} alt="" className="logo-chat" />
                <div className="header-avatars">
                  {
                    members.map(v => {
                      return (
                        <Tooltip key={v.id} title={v.clientData.username} arrow>
                          <img src={v.clientData.avatar} className="common-avatar header-avatar" alt="" />
                        </Tooltip>
                      )
                    })
                  }
                </div>
              </div>
            </header>
            <Message messages={messages} users={users} />
            <Input onSendMessage={onSendMessage} />
          </div>
          :
          <div className="container">
            <div className="intro-screen">
              <div className="logo">
                <img src={logoIntro} alt="" />
              </div>
              <div className="title">First type your chat name and pick an avatar</div>
              <div className="subtitle">Choose one from existing avatars</div>
              <input value={user.username} onChange={handleUsername} type="text" placeholder="Your chat name" />
              <div className="avatars">
                <div className={`item ${user.avatarId === 1 ? 'active' : ''}`} 
                      onClick={() => handleAvatar(1)}>
                  <img src={avatar1} alt="" />
                </div>
                <div className={`item ${user.avatarId === 2 ? 'active' : ''}`} 
                      onClick={() => handleAvatar(2)}>
                  <img src={avatar2} alt="" />
                </div>
                <div className={`item ${user.avatarId === 3 ? 'active' : ''}`} 
                      onClick={() => handleAvatar(3)}>
                  <img src={avatar3} alt="" />
                </div>
              </div>

              <button onClick={submitUsername} 
              disabled={(user.username.length > 3 && user.avatar) 
              ? 
              false : true}>OK</button>
            </div>
          </div>
      }
    </div>
  );
  
}

export default App;
