import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC0IUoCVDZEsY4f07C6cZZL7l4y4xxwy8k",
    authDomain: "food4me-e0a60.firebaseapp.com",
    projectId: "food4me-e0a60",
    storageBucket: "food4me-e0a60.appspot.com",
    messagingSenderId: "906677105549",
    appId: "1:906677105549:web:0746220ce4ea93c2f143c4",
    measurementId: "G-QY5JGDEE09"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);