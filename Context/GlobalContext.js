import { createContext, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore"
import React, { useEffect } from 'react'
export const themeContext = createContext();
export const foodContext = createContext();
export const userContext = createContext();
export const userDataContext = createContext();



export const DataProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(false)
  const [foodarray, setFoodArray] = useState([])
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState({})


  const foodCollectionRef = collection(db, 'Recipes')

  useEffect(() => {
    const getFood = async () => {
      getDocs(foodCollectionRef)
        .then((snapshot) => {

          let newarray = []
          snapshot.docs.forEach((doc) => {
            var subdata = doc.data()
            subdata.docid = doc.id
            newarray.push({ ...subdata })
          })
          setFoodArray(newarray)

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
          <userDataContext.Provider value={[userData, setUserData]}>

            {props.children}
          </userDataContext.Provider>
        </themeContext.Provider>
      </foodContext.Provider>
    </userContext.Provider>

  )
}