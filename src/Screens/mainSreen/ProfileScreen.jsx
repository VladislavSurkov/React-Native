import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, ImageBackground } from "react-native";
import { mainStyles as styles } from "./main.styles";

import Avatar from "../../Components/Avatar";
import authSelectors from "../../redux/auth/authSelectors";
import PostCard from "../../Components/PostCard";
import postsSelectors from "../../redux/posts/postsSelectors";
import { FlatList } from "react-native-gesture-handler";
import LogOutIcon from "./../../Components/LogoutIcon";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const user = useSelector(authSelectors.getUser);
  const [photoURL, setPhotoURL] = useState(user.userAvatar);

  const posts = useSelector(postsSelectors.getOwnPosts)
    .slice()
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

  return (
    <View style={styles.profileContainer}>
      <ImageBackground
        style={styles.profileImgBg}
        source={require("../../../assets/img/PhotoBG.jpg")}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={posts}
            ListHeaderComponent={
              <View style={styles.profileRegScr}>
                <View style={styles.profileAvatarBox}>
                  <View style={styles.profileAvatarImg}>
                    <Avatar avatarImg={photoURL} setAvatarImg={setPhotoURL} />
                  </View>
                </View>
                <View style={styles.exitBtn}>
                  <LogOutIcon />
                </View>

                <Text style={[styles.profileAvatarName]}>{user.nickName}</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View
                style={{ paddingHorizontal: 16, backgroundColor: "#ffffff" }}
              >
                <PostCard post={item} />
              </View>
            )}
            ListEmptyComponent={
              <View
                style={{
                  height: 100,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>You don't have posts yet</Text>
              </View>
            }
          />

          <View
            style={{
              marginTop: -1,
              flexGrow: 10 ** 10,
              width: "100%",
              backgroundColor: "#ffffff",
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
