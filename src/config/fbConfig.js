import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAbCdLaEdzLoNGC0_0Xd1MNxdLDopfQb5o",
  authDomain: "react-chat-app-a20de.firebaseapp.com",
  databaseURL: "https://react-chat-app-a20de.firebaseio.com",
  projectId: "react-chat-app-a20de",
  storageBucket: "react-chat-app-a20de.appspot.com",
  messagingSenderId: "731465246676",
  appId: "1:731465246676:web:3a723698e5c7f3272a1841"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

export default firebase;