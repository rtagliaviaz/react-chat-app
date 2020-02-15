import React, { Component } from 'react'

export default class ChatList extends Component {

  state = {
    msgRead : false,
    users: [],
    messages: []
  }


  newChat = () => {
    this.props.newChatBtn()
  }
  selectChat = index => {
    this.props.selectChat (index)
  }

  userSender = chat => chat.messages[chat.messages.length-1].sender === this.props.user 

  render() {
    console.log(this.props)

    if(this.props.chats.length > 0 ){
    return (
      <div>
        <div>
          <div >
            <div className='card chatView border-0'>
              <div className="card-header border-0">
              <button 
                onClick={this.newChat}
                className='btn btn-dark btn-block'>New Message</button>
              </div>
              <div className='card-body'>
                {
                  this.props.chats.map((chat, i) => {
                    console.log(chat)
                    return(
                    <div 
                      id="separator"
                      onClick={() => this.selectChat(i)}
                      selected={this.props.selectedChat === i}
                      key={i}
                      >
                      
                      <div className="boton">
                        <button className="btn btn-dark btn-circle">{chat.users.filter(user => user !== this.props.user)[0].split('')[0]}</button>
                      </div> 
                      
                      
                      <div className="user-and-chat">
                        <span>{chat.users.filter(user => user !== this.props.user)}</span>
                        <p>{chat.messages[chat.messages.length -1] !== undefined ? chat.messages[chat.messages.length -1].msg.substring(0,20) : null}</p>
                      </div>

                     
                      <div className="notReadYet">
                      {chat.msgRead===false && !this.userSender(chat) ? <button className="btn btn-danger ">!</button>: null}
                      </div>

                    </div>
                    )
                  })
                }
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
            <div className='card border-0'>
              <div className='card-header border-0'>
                <button
                  onClick={this.newChat}
                  className='btn btn-dark btn-block py-1 '
                >
                  New Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  }
}


//<div className='row'>
//<div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>