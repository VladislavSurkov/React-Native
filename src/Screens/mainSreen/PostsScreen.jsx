import React from "react";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { mainStyles as styles } from "./main.styles";

export default function PostsScreen({ route, navigation }) {

  if (route.params) {
    const { photo, location, state } = route.params;
    console.log(photo, location, state);
  }
  
  return (
    <View style={styles.postsContainer}>
      <View style={styles.postsAvatarContainer}>
        <Image
          style={styles.postsAvatarImg}
          source={require("../../../assets/img/noAvatar.png")}
        />
        <View style={styles.postsAvatarData}>
          <Text style={styles.postsAvatarName}>Natali Romanova</Text>
          <Text style={styles.postsAvatarEmail}>email@example.com</Text>
        </View>
      </View>

      <View>
        <Image
          style={styles.postsPhoto}
          source={require("../../../assets/img/PhotoBG.jpg")}
        />
        <Text style={styles.postsLocationName}>Wood</Text>

        <View style={styles.postsIconsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Comments")}
            activeOpacity={0.8}
            style={styles.postsInnerWrapperIcons}
          >
            <Feather name="message-circle" size={24} color="#BDBDBD" />
            <Text style={styles.postsMesseges}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Map")}
            activeOpacity={0.8}
            style={styles.postsInnerWrapperIcons}
          >
            <EvilIcons name="location" size={24} color="#BDBDBD" />
            <Text style={styles.postsLocation}>
              Ivano-Frankivs'k Region, Ukraine
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
