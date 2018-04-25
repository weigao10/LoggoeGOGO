import React from 'react';
import io from 'socket.io-client';
window.io = io

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.socket.bind(this);
  }

  render() {
    // console.log('in chatroom render')
    this.socket()
    return (
      <div style={chatroomStyle}>
        <div style={bodyStyle}>
          <ul id="messages" style={messagesStyle} />
          <form style={formStyle} action="">
            <input style={formInputStyle} id="m" autoComplete="off" />
            <button style={formButtonStyle}>Send</button>
          </form>
        </div>
      </div>
    );
  }

  socket() {
    // console.log('hello', window.io)
    var socket = window.io.connect('http://localhost:3000');
  }
}

const chatroomStyle ={
  "margin": "0",
  "padding": "0",
  "boxSizing": "border-box"
}

const bodyStyle = {
  'font': '13px Helvetica, Arial'
}

const formStyle = {
  'background': '#000',
  'padding': '3px',
  // 'position': 'fixed',
  'bottom':'0',
  'width': '100%'
}

const formInputStyle = {
  'border': '0',
  'padding': '10px',
  'width': '90%',
  'marginRight': '.5%'
}

const formButtonStyle = {
  'width': '17%',
  'background': 'rgb(130, 224, 255)',
  'border': 'none',
  'padding': '10px'
}

const messagesStyle = {
  'listStyleType': 'none',
  'margin': '0',
  'padding': '0'
}

/*
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
*/

export default ChatRoom;