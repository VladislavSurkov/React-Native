import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { updatePost } from "../redux/posts/postsOperation";

export default function PostCard({post}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { countComments, comments, likeCount } = post;
  const { id, imgUri, title, location, locationData } = post;

  const updateLike = () => {
    const like = likeCount + 1;
    const payload = {
      likeCount: like,
    };
    dispatch(updatePost(id, payload));
  };

  const onPressCommentsIcon = () => {
    navigation.navigate("Comments", { imgUri, comments, postId: id });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.postsPhoto} source={{ uri: imgUri }} />
      <Text style={styles.postsLocationName}>{title}</Text>

      <View style={styles.postsIconsContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={onPressCommentsIcon}
            activeOpacity={0.8}
            style={{ ...styles.postsInnerWrapperIcons, marginRight: 24 }}
          >
            <Feather
              name="message-circle"
              size={24}
              color={countComments === 0 ? "#BDBDBD" : "#FF6C00"}
            />
            <Text style={styles.postsMesseges}>{countComments}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={updateLike}
            style={styles.postsInnerWrapperIcons}
          >
            <AntDesign
              name={likeCount === 0 ? "like2" : "like1"}
              size={24}
              color="#FF6C00"
            />
            <Text style={styles.postsMesseges}>{likeCount}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Map", { location, locationData })}
          activeOpacity={0.8}
          style={styles.postsInnerWrapperIcons}
        >
          <EvilIcons name="location" size={24} color="#BDBDBD" />
          <Text style={styles.postsLocation}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  postsPhoto: {
    width: "100%",
    height: 240,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  postsLocationName: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 11,
  },

  postsIconsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  postsMesseges: {
    marginLeft: 9,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  postsLocation: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },

  postsInnerWrapperIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
