import React, { Component } from 'react'

export default class ChatView extends Component {

  componentDidUpdate = () => {
    const container = document.getElementById('chatContainer');
    if(container){
      console.log(container.scrollHeight)
      container.scrollTo(0, container.scrollHeight)
    }
  }

  render() {
    const chat = this.props.chat
    const user = this.props.user

    if(chat === undefined){
    return(
      null
    )
  } else {
    return (
      <div>
        <div className="Talking-to">
          <p>{this.props.chat.users.filter(usr => usr !== user)[0]}</p>
        </div>
        <main id="chatContainer" className="content"> 
        {this.props.chat.messages.map((message, i) => {
          return (
            <div className={ message.sender === user ? 
                "card userCard" : 
                "card friendCard" }
                key={i} >
              {message.msg}
            </div>
          );
        })}
        </main>
      </div>
    );
  }
  }
}
