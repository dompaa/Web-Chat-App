import React, { useState } from "react";
import sendMsgIcon from '../assets/send-arrow.svg'

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

  return (
    <div className="container h-auto new-msg-section">
      <div className="message-input">
        <form onSubmit={(e) => onSubmit(e)} className="new-msg-form">
          <input
            onChange={(e) => onChange(e)}
            value={textInputs}
            type="text"
            placeholder="Start a new message"
          />
          <button className="btn-send-msg">
            <img src={sendMsgIcon} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Input;
