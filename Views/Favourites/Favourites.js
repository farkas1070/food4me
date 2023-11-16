import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, doc, getDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import { auth } from "../../firebase-config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import { foodContext } from "../../Context/GlobalContext.js";
import { styles } from "./FavouritesStyle";
import Header from "./Components/Header";
import LoadingOverlay from "./Components/LoadingOverlay";
const Favourites = ({ navigation }) => {
  const userRef = doc(db, "Users", auth.currentUser.uid);
  const favouritesquery = query(
    collection(db, "Favourites"),
    where("User_ID", "==", userRef)
  );
  const [favouritesSnapshot, favouritesSnapshotLoading] =
    useCollectionData(favouritesquery);
  const [favourites, setFavourites] = useState([]);
  const [foodarray] = useContext(foodContext);

  useEffect(() => {
    const getFavouriteRef = async () => {
      try {
        if (!favouritesSnapshotLoading) {
          const newarray = await Promise.all(
            favouritesSnapshot.map(async (favourite) => {
              const docSnap = await getDoc(favourite.Recipe_ID);
              const subdata = {
                ...favourite,
                name: docSnap.data().name,
                image: docSnap.data().image,
                servings: docSnap.data().servings,
                ready: docSnap.data().ready,
              };
              return subdata;
            })
          );
          setFavourites(newarray);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (favourites.length === 0 && favouritesSnapshot) {
      getFavouriteRef();
    }
  }, [favouritesSnapshot, favouritesSnapshotLoading]);

  const handleNavigation = (favourite) => {
    foodarray.map((data) => {
      if (data.name == favourite.name) {
        navigation.navigate("SingleElement", { item: data });
      }
    });
  };
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.maincontainer}>
      {favouritesSnapshotLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          <Header />
          <View style={styles.bodyContainer}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {favourites.map((favourite, i) => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      handleNavigation(favourite);
                    }}
                    key={i}
                  >
                    <Image
                      source={{ uri: favourite.image }}
                      style={styles.image}
                    />
                    <View style={styles.textContainer}>
                      <Text
                        style={[styles.nameText, { fontFamily: "CustomFont" }]}
                      >
                        {favourite.name}
                      </Text>
                      <View style={styles.subTextContainer}>
                        <MaterialCommunityIcons
                          name="camera-timer"
                          size={24}
                          color="black"
                        />
                        <Text style={styles.subText}>
                          {" "}
                          {favourite.servings} People
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="bowl-mix-outline"
                          size={24}
                          color="black"
                        />
                        <Text style={styles.subText}>
                          {" "}
                          {favourite.ready} Minutes
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default Favourites;
