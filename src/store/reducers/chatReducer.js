const initState = {
  user: null,
  chats: [],
  chatIndex: null,
  newUsers: null
}

const chatReducer = (state= initState, action) => {
  switch (action.type) {
    case 'CHAT_SNAPSHOT':
      return {
        user:  action.user,
        chats: action.chats
      }
    case 'SUBMIT_MSG':
      return{
        ...state
      }
    case 'MESSAGE_READ':
      return{
        ...state
      }
    case 'NEW_CHAT_USERS':
      return {
        ...state,
        newUsers : action.usersFilteredAgain
      }
    case 'NEW_CHAT_CREATED':
      return{
        ...state
      }
    default:
      return state
  }
}

export default chatReducer