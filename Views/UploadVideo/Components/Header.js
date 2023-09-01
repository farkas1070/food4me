import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./HeaderStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <MaterialIcons
            name="keyboard-backspace"
            size={24}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        
      </View>
      <Text style={styles.uploadText}>Upload Video</Text>

    </SafeAreaView>
  );
};

export default Header;
