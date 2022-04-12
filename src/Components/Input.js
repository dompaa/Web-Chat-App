import React, { useState } from "react";
import sendMsgIcon from '../assets/send-arrow.svg'
import Picker from 'emoji-picker-react';
import emojiIcon from "../assets/emoji-icon.svg";

const Input = ({ onSendMessage }) => {
  const [textInputs, setTextInputs] = useState("");

  function onChange(e) {
    setTextInputs(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setTextInputs("");
    onSendMessage(textInputs);
  }



  const [emojiPickerShown, setEmojiPickerShown] = useState(false)
  

  const handleEmojiIcon = () => {
    setEmojiPickerShown(!emojiPickerShown)
  }

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setTextInputs((prevValue) => `${prevValue}${emojiObject.emoji}`)
  }

  return (
    <div className="container h-auto new-msg-section">
      <div className="message-input">
        <form onSubmit={(e) => onSubmit(e)} className="new-msg-form">
          <input
            onChange={(e) => onChange(e)}
            value={textInputs}
            type="text"
            placeholder="Type message here..."
          />
           {
            emojiPickerShown && <Picker onEmojiClick={onEmojiClick} />
           }
          <img className="emoji-icon" onClick={handleEmojiIcon} src={emojiIcon} alt="" />
          <button className="btn-send-msg">
          <img src={sendMsgIcon} alt="" />
        </button>   
        </form>
            
          
      </div>
    </div>
  );
};

export default Input;
