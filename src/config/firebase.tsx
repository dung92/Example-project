import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCIQJ35TMBYvzGyw44XkOqYlw-DdMVQoAo",
    authDomain: "demotest-b7ba8.firebaseapp.com",
    projectId: "demotest-b7ba8",
    storageBucket: "demotest-b7ba8.appspot.com",
    messagingSenderId: "1085772222673",
    appId: "1:1085772222673:web:206ee01cb16ad6904b35f0"
};

firebase.initializeApp(firebaseConfig);

export default firebase