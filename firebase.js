import firebase from "firebase";
if (!firebase.apps.length) {
  firebase.initializeApp({
    //Get from firebase
    apiKey: 
    authDomain: 
    projectId:
    storageBucket: 
    messagingSenderId: 
    appId: 
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
const database = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export { auth };
export { provider };
export { db };
export { database };
