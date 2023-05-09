import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";


export default function PostCard({
  likeCount,
  title,
  location,
  locationData,
  imgUri,
  comments,
  post,
}) {
  const { countComments } = post;

  const navigation = useNavigation();

  const onPressCommentsIcon = () => {
    navigation.navigate("Comments", { imgUri, comments, postId: post.id });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.postsPhoto} source={{ uri: imgUri }} />
      <Text style={styles.postsLocationName}>{title}</Text>

      <View style={styles.postsIconsContainer}>
        <TouchableOpacity
          onPress={onPressCommentsIcon}
          activeOpacity={0.8}
          style={styles.postsInnerWrapperIcons}
        >
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={styles.postsMesseges}>{countComments}</Text>
        </TouchableOpacity>
        {/* <AntDesign name="like2" size={24} color="black" /> */}
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
