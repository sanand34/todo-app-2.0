import firebase from "firebase";
if (!firebase.apps.length) {
  firebase.initializeApp({
    //get from firebase,
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
