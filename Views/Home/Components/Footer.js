import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Linking } from "react-native";
import { styles } from "./FooterStyle";

const Footer = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.facebook.com/");
          }}
        >
          <Entypo
            name="facebook-with-circle"
            size={30}
            color="#fd5a43"
            style={styles.icon}
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
            style={styles.icon}
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
            style={styles.icon}
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
            style={styles.icon}
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
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <Text style={{ color: "#fd5a43", fontSize: 8, fontWeight: "bold" }}>
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
  );
};

export default Footer;
