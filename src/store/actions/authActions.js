export const signIn = (credentials) => {
  return async (dispatch, getState, {getFirebase}) => {
    //initialize
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
      dispatch({ type: 'LOGIN_SUCCESS'})
    } catch (err) {
      dispatch({ type: 'LOGIN_ERROR', err})
    }
  }
}

export const signOut = () => {
  return async (dispatch, getState, {getFirebase}) => {
    //initiliaze
    const firebase = getFirebase();
      await firebase.auth().signOut()
      dispatch({ type: 'SIGNOUT_SUCCESS'})
  };
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //initialize
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then(() => {
      firestore.collection('usersList').doc('usersList').get().then(res => {
        if (res.data()){
          const usrs = res.data().users
          return firestore.collection('usersList').doc('usersList').update({
            users: [...usrs, newUser.email]
          })
        } else {
          return firestore.collection('usersList').doc('usersList').update({
            users: [newUser.email]
          })
        }
      })
      .then(() => {
        return firebase.firestore().collection('chats').doc(newUser.email+':test@user.com').set({
          msgRead: false,
          users: [
            newUser.email,
            'test@user.com'
          ],
          messages: [
            {msg: 'hello', sender: 'test@user.com'}
          ]        
        })
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS'})
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err})
    })
  }
}