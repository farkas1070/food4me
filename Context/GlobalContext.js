import { createContext, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useEffect } from "react";
export const themeContext = createContext();
export const foodContext = createContext();
export const userContext = createContext();
export const userDataContext = createContext();
export const videosContext = createContext();
export const singleOrAllvideosContext = createContext();

export const DataProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [foodarray, setFoodArray] = useState([]);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [videos, setVideos] = useState([]);
  const [singleVideo, setSingleVideo] = useState(false);

  const foodCollectionRef = collection(db, "Recipes");
  const videosCollectionRef = collection(db, "Videos");

  const fetchDataFromFirestore = async (ref, setState) => {
    try {
      await getDocs(ref)
        .then((snapshot) => {
          const newData = snapshot.docs.map((doc) => {
            const subdata = doc.data();
            subdata.docid = doc.id;
            return { ...subdata };
          });
          setState(newData);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  useEffect(() => {
    fetchDataFromFirestore(foodCollectionRef, setFoodArray);
    fetchDataFromFirestore(videosCollectionRef, setVideos);
  }, []);

  return (
    <userContext.Provider value={[user, setUser]}>
      <foodContext.Provider value={[foodarray, setFoodArray]}>
        <themeContext.Provider value={[darkTheme, setDarkTheme]}>
          <userDataContext.Provider value={[userData, setUserData]}>
            <videosContext.Provider value={[videos, setVideos]}>
              <singleOrAllvideosContext.Provider
                value={[singleVideo, setSingleVideo]}
              >
                {props.children}
              </singleOrAllvideosContext.Provider>
            </videosContext.Provider>
          </userDataContext.Provider>
        </themeContext.Provider>
      </foodContext.Provider>
    </userContext.Provider>
  );
};
