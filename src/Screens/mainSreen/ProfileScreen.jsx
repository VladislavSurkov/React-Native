import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { mainStyles as styles } from "./main.styles";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileScreen() {

  return (
    <View style={styles.profileContainer}>
      <ImageBackground
        style={styles.profileImgBg}
        source={require("../../../assets/img/PhotoBG.jpg")}
      >
        <View style={styles.profileRegScr}>
          <View style={styles.profileAvatarBox}>
            <Image
              style={styles.profileAvatarImg}
              source={require("../../../assets/img/noAvatar.png")}
            />
            <AntDesign
              name="closecircleo"
              style={styles.profileAddRemovePhoto}
              size={25}
              color="#E8E8E8"
            />
          </View>
          <Text style={styles.profileAvatarName}>Natali Romanova</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
