// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC6gTeKVgjEazupezx2UrG0dpIAUm8H2Os",
    authDomain: "trek-link.firebaseapp.com",
    databaseURL: "https://trek-link-default-rtdb.firebaseio.com",
    projectId: "trek-link",
    storageBucket: "trek-link.appspot.com",
    messagingSenderId: "578102325109",
    appId: "1:578102325109:web:f79fac9b4174952ca76d3c",
    measurementId: "G-ECSL3RQGLY"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db};