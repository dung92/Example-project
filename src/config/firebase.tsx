import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBc9ujr6s-nlVPGhTcWsC_K7mLpasCaVvg",
    authDomain: "dayone-test.firebaseapp.com",
    projectId: "dayone-test",
    storageBucket: "dayone-test.appspot.com",
    messagingSenderId: "678316685337",
    appId: "1:678316685337:web:2280b5ac35036509fe9288",
    measurementId: "G-TLH8PE881S"
};

firebase.initializeApp(firebaseConfig);

export default firebase