import React, { Component } from "react";
// import firebase from '../config/fbConfig'
import { connect } from "react-redux";
import { snapChat, submitMessage, receiverHasRead } from "../store/actions/chatActions";

//components
import ChatList from "./ChatList";
import ChatView from "./ChatView";
import ChatInput from "./ChatInput";
import NewChat from './NewChat'

class Dashboard extends Component {
  state = {
    selectedChat: null,
    newChat: false
  };

  newChatBtnClicked = () => {
    this.setState({
      newChat: true,
      selectedChat: null
    });
  };

  selectChat = async chatIndex => {
   await this.setState({
      selectedChat: chatIndex,
      newChat: false
    });
    this.messageRead();
  };

  submitMsg = msg => {
    const id = this.docId(
      this.props.chats[this.state.selectedChat].users.filter(
        usr => usr !== this.props.user
      )[0]
    );
    const sender = this.props.user
    this.props.submitMessage(id, sender, msg)
  };

  docId = friend => [this.props.user, friend].sort().join(":");

  clickedChatNotSender = chatIndex => this.props.chats[chatIndex].messages > 0 ? this.props.chats[chatIndex].messages[this.props.chats[chatIndex].messages.length-1].sender !== this.props.user : this.docId(
    this.props.chats[this.state.selectedChat].users.filter(
      usr => usr !== this.props.user
    )[0]
  );

  messageRead=()=>{
    const id = this.docId(this.props.chats[this.state.selectedChat].users.filter(usr => usr !== this.props.user)[0])
    if(this.clickedChatNotSender(this.state.selectedChat)) {
      this.props.receiverHasRead(id)
    } else {
      console.log('stay away sender')
    }
  }
  componentDidMount = () => {
    this.props.snapChat(this.state);
  };

  render() {
    const { user, chats } = this.props;
    return (
      <div className="container">
        <div className='row '>
          <div className='col-lg-4 col-md-6 col-sm-6 col-xs-12'>
            <ChatList
              newChatBtn={this.newChatBtnClicked}
              selectChat={this.selectChat}
              chats={chats}
              user={user}
              selectedChat={this.state.selectedChat}
              history={this.props.history}
            />
          </div>
          {this.state.newChat ? 
            null :
            <div className='col-lg-8 col-md-6 col-sm-6 col-xs-12'>
            <div className='mt-4'>
              <ChatView 
                user={user} 
                chat={chats[this.state.selectedChat]} />
            </div>
            <div className='my-1'>
              {this.state.selectedChat == null ? null : (
                <ChatInput 
                  msgRead={this.messageRead}
                  submitMsg={this.submitMsg} />
              )}
            </div>
          </div> 
            }

            {this.state.newChat ? 
            <div className='col-lg-8 col-md-6 col-sm-6 col-xs-12'>
              <NewChat 
              docId={this.docId}
              currentUser={user}
              chats={chats}/>
            </div> :
            console.log(this.state.newChat)}

 
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.chat.user,
    chats: state.chat.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    snapChat: info => dispatch(snapChat(info)),
    submitMessage: (id, sender, msg) => dispatch(submitMessage(id, sender, msg)),
    receiverHasRead: id => dispatch(receiverHasRead(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
