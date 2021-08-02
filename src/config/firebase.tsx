import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAGJzN-T-BTFFpHXFZidtBT2c0MDoj9R-A",
    authDomain: "phone-test-authentication.firebaseapp.com",
    projectId: "phone-test-authentication",
    storageBucket: "phone-test-authentication.appspot.com",
    messagingSenderId: "444018626171",
    appId: "1:444018626171:web:6213f87251533c49be9cde"
};

firebase.initializeApp(firebaseConfig);

export default firebase