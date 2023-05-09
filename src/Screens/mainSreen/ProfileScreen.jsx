import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, ImageBackground, Image } from "react-native";
import { mainStyles as styles } from "./main.styles";

import Avatar from "../../Components/Avatar";
import authSelectors from "../../redux/auth/authSelectors";
import PostCard from "../../Components/PostCard";
import postsSelectors from "../../redux/posts/postsSelectors";
import { ScrollView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const user = useSelector(authSelectors.getUser);
  const [photoURL, setPhotoURL] = useState(user.userAvatar);
  const dispatch = useDispatch();
   const posts = useSelector(postsSelectors.getPosts);

  return (
    <View style={styles.profileContainer}>
      <ImageBackground
        style={styles.profileImgBg}
        source={require("../../../assets/img/PhotoBG.jpg")}
      >
        <View style={styles.profileRegScr}>
          <View style={styles.profileAvatarBox}>
            <Avatar avatarImg={photoURL} setAvatarImg={setPhotoURL} />
          </View>
          <Text style={styles.profileAvatarName}>{user.nickName}</Text>
          <ScrollView>
            <View>
              {posts.map((post) => (
                <View key={post.id} style={{ marginBottom: 10 }}>
                  <PostCard
                    title={post.title}
                    likeCount={post.likeCount}
                    imgUrl={post.imgUrl}
                    imgUri={post.imgUri}
                    location={post.location}
                    locationData={post.locationData}
                    comments={post.comments}
                    post={post}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}
