import React, { Component } from 'react'
import {connect} from 'react-redux'
import {newChatUsers, createNewChat} from '../store/actions/chatActions'

class NewChat extends Component {

  state = {
    users: [],
    userSelected: '',
    clicked: false
  }

  newChat = async (user) => {
    await this.userClicked(user)
    const currentUser = this.props.currentUser
    const userSelected = this.state.userSelected
    const id = await this.docId()
    console.log(id)

    this.props.createNewChat(id, currentUser, userSelected)
  }

  docId = () => [this.props.currentUser, this.state.userSelected].sort().join(':')

  componentDidUpdate = () => {
    this.usersList()
  }

  userClicked = (user) => {
    this.setState({
      userSelected: user,
      clicked: true
    })
  }

  usersList =  () => {
    const currentUser = this.props.currentUser
    const chats = this.props.chats
    this.props.newChatUsers(currentUser, chats)
    }

  componentDidMount = () => {
    this.usersList();
  }

  render() {
    const users = this.props.users
    return (
      <div>
        {users && users.map(user => {
          return(
            <div key={user}>
              <button className="btn btn-dark"  onClick={() => this.newChat(user)}>{user}</button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    users: state.chat.newUsers
  }
}

const mapDispatchToProps = dispatch => {
  return{
    newChatUsers : (currentUser, chats) => dispatch(newChatUsers(currentUser, chats)),
    createNewChat: (id, currentUser, userSelected) => dispatch(createNewChat(id, currentUser, userSelected))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NewChat)