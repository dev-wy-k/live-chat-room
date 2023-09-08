import {initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCaEaV8RPHvhk8vV2OG3K7jdu1xwUcMxk8",
    authDomain: "live-chat-app-e6eae.firebaseapp.com",
    projectId: "live-chat-app-e6eae",
    storageBucket: "live-chat-app-e6eae.appspot.com",
    messagingSenderId: "226348510990",
    appId: "1:226348510990:web:ea61dab61a5a3518c6715f"
  };

let app = initializeApp(firebaseConfig);
let db=getFirestore(app);
let auth=getAuth();


// let timestamp = firebase.firestore.FieldValue.serverTimeStamp;
export {db,auth,createUserWithEmailAndPassword};