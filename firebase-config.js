import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore, collection,getDocs
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC0IUoCVDZEsY4f07C6cZZL7l4y4xxwy8k",
    authDomain: "food4me-e0a60.firebaseapp.com",
    projectId: "food4me-e0a60",
    storageBucket: "food4me-e0a60.appspot.com",
    messagingSenderId: "906677105549",
    appId: "1:906677105549:web:0746220ce4ea93c2f143c4",
    measurementId: "G-QY5JGDEE09"
  };

//init firebase
const app = initializeApp(firebaseConfig);

//init service
const db = getFirestore()

//collection reference
const colRef = collection(db,"foods")

// get collection data
getDocs(colRef)
  .then((snapshot) =>{
    let foods = []
    snapshot.docs.forEach((doc) =>{
      foods.push({...doc.data(),id:doc.id})
    })
    console.log(foods)
  })
  .catch(error =>{
    console.log(error)
  })
export const auth = getAuth(app);