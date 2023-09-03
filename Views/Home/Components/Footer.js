
import React,{useContext} from 'react'

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { Linking } from "react-native";
import {generateStyles} from "./FooterStyle"
import { themeContext } from '../../../Context/GlobalContext';
const Footer = () => {
    const [darkTheme, setDarkTheme] = useContext(themeContext);
    const styles = generateStyles(darkTheme);
  return (
    <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 100,
              backgroundColor: darkTheme ? "#181616" : "black",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.facebook.com/");
                }}
              >
                <Entypo
                  name="facebook-with-circle"
                  size={30}
                  color="#fd5a43"
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.instagram.com/");
                }}
              >
                <Entypo
                  name="instagram-with-circle"
                  size={30}
                  color="#fd5a43"
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://github.com/");
                }}
              >
                <Entypo
                  name="github-with-circle"
                  size={30}
                  color="#fd5a43"
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.pinterest.com/");
                }}
              >
                <Entypo
                  name="pinterest-with-circle"
                  size={30}
                  color="#fd5a43"
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.youtube.com/");
                }}
              >
                <Entypo
                  name="youtube-with-circle"
                  size={30}
                  color="#fd5a43"
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#fd5a43", fontSize: 8, fontWeight: "bold" }}
              >
                Copyright: Foodemy Coorporation 2022
              </Text>
              <Text
                style={{
                  color: "#fd5a43",
                  fontSize: 8,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                Get In touch with us!
              </Text>
            </View>
          </View>
  )
}

export default Footer

