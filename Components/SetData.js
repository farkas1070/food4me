import { createContext, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore"
import React, { useEffect } from 'react'
export const themeContext = createContext();
export const foodContext = createContext();
export const userContext = createContext();



export const DataProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(false)
  const [foodarray, setFoodArray] = useState([])
  const [user, setUser] = useState({})
  

  const foodCollectionRef = collection(db, 'foods')

  useEffect(() => {
    const getFood = async () => {
      getDocs(foodCollectionRef)
        .then((snapshot) => {

          let newarray = []
          snapshot.docs.forEach((doc) => {
            newarray.push({ ...doc.data() })
          })
          setFoodArray(newarray)
          console.log(newarray)
        })
        .catch(error => {
          console.log(error)
        })
    }
    getFood();
  }, [])

  return (
    
      <userContext.Provider value={[user, setUser]} >
        <foodContext.Provider value={[foodarray, setFoodArray]}>
          <themeContext.Provider value={[darkTheme, setDarkTheme]}>
            {props.children}
          </themeContext.Provider>
        </foodContext.Provider>
      </userContext.Provider>
    
  )
}