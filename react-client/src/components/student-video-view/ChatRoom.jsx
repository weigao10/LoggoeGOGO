import React from 'react';
import io from 'socket.io-client';
window.io = io
let socket;

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }
    this.postMessage = this.postMessage.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount(){
    socket = window.io.connect('http://localhost:3000');
  }

  postMessage(){
    socket.emit('send message', this.state.message);
    this.setState({
      messages: [...this.state.messages, this.state.message]
    }, () => {
      document.getElementById('message').value = ''
    })
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
              return (<div style={messagesStyle}>{this.props.username}: {message}</div>)
            }
          )}
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
  'font': '13px Helvetica, Arial'
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
  'padding': '0'
}

const messageStyle ={
  "padding": "5px 10px"

}

/*
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
*/

export default ChatRoom;