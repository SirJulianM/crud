import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqwS4gD30Cr9QthGznmRPpEjGTp0IyBSM",
    authDomain: "crud-2d5e9.firebaseapp.com",
    projectId: "crud-2d5e9",
    storageBucket: "crud-2d5e9.appspot.com",
    messagingSenderId: "336226193529",
    appId: "1:336226193529:web:4ddd6f250c0363763984a8"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);