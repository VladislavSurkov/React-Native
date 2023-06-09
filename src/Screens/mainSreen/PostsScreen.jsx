import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { mainStyles as styles } from "./main.styles";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "./../../redux/auth/authSelectors";
import postsSelectors from "./../../redux/posts/postsSelectors";
import { getAllPosts, getOwnPosts } from "./../../redux/posts/postsOperation";
import { ScrollView } from "react-native-gesture-handler";
import PostCard from "../../Components/PostCard";

export default function PostsScreen() {
  const posts = useSelector(postsSelectors.getPosts);
  const user = useSelector(authSelectors.getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  }, [dispatch]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.postsContainer}>
        <View style={styles.postsAvatarContainer}>
          <Image
            style={styles.postsAvatarImg}
            source={{ uri: user.userAvatar }}
          />
          <View style={styles.postsAvatarData}>
            <Text style={styles.postsAvatarName}>{user.nickName}</Text>
            <Text style={styles.postsAvatarEmail}>{user.userEmail}</Text>
          </View>
        </View>
        <View>
          {posts.map((post) => (
            <View key={post.id} style={{ marginBottom: 10 }}>
              <PostCard post={post} update={false} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
