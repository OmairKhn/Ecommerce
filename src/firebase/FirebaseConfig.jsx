// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvChtMDl341cgWSdoWHm9Q6I3c6Oz30TU",
  authDomain: "myfirstapp-b66db.firebaseapp.com",
  projectId: "myfirstapp-b66db",
  storageBucket: "myfirstapp-b66db.appspot.com",
  messagingSenderId: "27477679864",
  appId: "1:27477679864:web:d2f674d782a4fe36fe650d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth }