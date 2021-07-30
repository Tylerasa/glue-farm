import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyCMLgNzr5h6RL6jcB29IoE9FJ0iDRj2sbo",
  authDomain: "tekdwom.firebaseapp.com",
  projectId: "tekdwom",
  storageBucket: "tekdwom.appspot.com",
  messagingSenderId: "784439898619",
  appId: "1:784439898619:web:876215e7bbb2f679c19b5e",
  measurementId: "G-LCJFQHNS6L",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
