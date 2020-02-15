export const snapChat = (info) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    //initialize
    const firebase = getFirebase();

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        return
      } else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", user.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(doc => doc.data());
            await dispatch({
              type: 'CHAT_SNAPSHOT',
              user: user.email,
              chats: chats
             })
          });
          
      }
    })
  }
}

export const receiverHasRead = (id) => {
  return async (dispatch, getState, {getFirebase}) => {
    //initialize
    const firebase = getFirebase();

    await firebase
      .firestore()
      .collection('chats')
      .doc(id)
      .update({
        msgRead: true
      })
    dispatch({
      type: 'MESSAGE_READ'
    })
  }
}

export const submitMessage = (id, sender, msg) => {
  return async (dispatch, getState, {getFirebase}) => {
    //initialize
    const firebase = getFirebase();

    await firebase
      .firestore()
      .collection("chats")
      .doc(id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: sender,
          msg: msg,
          timestamp: Date.now()
        }),
        msgRead: false
      });
      await dispatch({
        type: 'SUBMIT_MSG',
        id,
        sender,
        msg
      })
  }
}

export const newChatUsers = (currentUser, chats) => {
  return async(dispatch, getState, {getFirebase}) => {
    //initialize
    const firebase = getFirebase()

    await firebase
      .firestore()
      .collection('usersList')
      .doc('usersList')
      .get()
      .then(res => {
        if (res.exists) {
            // console.log("Document data:", res.data().users);
            const usersFiltered = res.data().users.filter(user => user !== currentUser)
            const chatsAlreadyListed = chats.map(item => item.users)
            
            //function to merge the users arrays
            function flatten(arr) {
              return [].concat(...arr);
            }

            const users = flatten(chatsAlreadyListed).filter(user => user !== currentUser)
            
            const usersFilteredAgain = usersFiltered.filter(user => !users.includes(user))
            // console.log(usersFilteredAgain)
            dispatch({
              type: 'NEW_CHAT_USERS',
              usersFilteredAgain
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      })

  }
}

export const createNewChat = (id, currentUser, userSelected) => {
  return async (dispatch, getState, {getFirebase}) => {
    //initialize
    const firebase = getFirebase()

    await firebase
      .firestore()
      .collection('chats')
      .doc(id)
      .set({
        msgRead: true,
        users: [
          currentUser,
          userSelected
        ],
        messages: []        
      })
      dispatch({
        type: 'NEW_CHAT_CREATED'
      })
  }
}