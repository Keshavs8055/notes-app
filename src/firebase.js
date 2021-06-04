import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { store } from "./redux/store";
import { setMainNoteData } from "./redux/userNotes/userNotes.action";

const {
  REACT_APP_APIKEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
};

export const firebase = app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const provider = new app.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();

const createUserDoc = (user) => {
  firestore
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return;
      } else {
        firestore.collection("users").doc(user.uid).set({
          name: user.displayName,
          created_on: new Date().toDateString(),
        });
        firestore.collection("users").doc(user.uid).collection("notes");
      }
    });
};

export const getNotes = (uid) =>
  new Promise((resp, rej) => {
    firestore
      .collection("users")
      .doc(uid)
      .collection("notes")
      .get()
      .then((docs) => {
        const notes = docs.docs.map((doc) => doc.data());
        return notes;
      })
      .then((notes) => {
        store.dispatch(setMainNoteData(notes));
        resp(notes);
      })
      .catch((e) => rej(e));
  });

export const googleSignIn = () =>
  new Promise((res, rej) => {
    auth
      .signInWithPopup(provider)
      .then((resp) => {
        createUserDoc(resp.user);
        res(resp);
      })
      .catch((e) => rej(e));
  });
