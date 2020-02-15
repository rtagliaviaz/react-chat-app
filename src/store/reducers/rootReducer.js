import authReducer from './authReducer'
import chatReducer from './chatReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer