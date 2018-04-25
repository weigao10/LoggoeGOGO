import React from 'react';
import io from 'socket.io-client';
window.io = io;

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }
    this.socket = null;
    this.postMessage = this.postMessage.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount(){
    this.socket = window.io.connect('http://localhost:3000');
    this.socket.on('new message', (data) => {
      this.setState({
        messages: [...this.state.messages, data.msg]
      }, () => {
        document.getElementById('message').value = ''
      })
    })
  }

  postMessage(){
    this.socket.emit('send message', {msg: this.state.message, user: this.props.username});

  }

  changeHandler(e){
    this.setState({
      message: e.target.value
    })
  }

  render() {
    return (
      <div style={chatroomStyle}>
        <div style={bodyStyle}>
          <div id="messages" style={messagesStyle} />
          {
            this.state.messages.map((message) => {
              let user = JSON.parse(message).user;
              let msg = JSON.parse(message).msg;
              return (<div style={messagesStyle}>{user}: {msg}</div>)
            })
          }
          <div style={formStyle}>
            <input value={this.state.message}
                    onChange={this.changeHandler}
                    style={formInputStyle} 
                    id="message" 
                    autoComplete="off" 
            />
            <button style={formButtonStyle}
                    onClick={this.postMessage}
            >Send</button>
          </div>
        </div>
      </div>
    );
  }

}

const chatroomStyle ={
  "margin": "0",
  "padding": "0",
  "boxSizing": "border-box"
}

const bodyStyle = {
  'font': '13px Helvetica, Arial',
  'border': '1px black solid'
}

const formStyle = {
  'background': '#000',
  'padding': '3px',
  // 'position': 'fixed',
  'bottom':'0',
  'width': '100%',
  'height': '100%'
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
  'paddingLeft': '10px',
  'textAlign': 'left'
}

const messageStyle ={
  "padding": "5px 10px"
}

export default ChatRoom;