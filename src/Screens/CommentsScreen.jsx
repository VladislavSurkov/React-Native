import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import postsSelectors from "../redux/posts/postsSelectors";
import authSelectors from "../redux/auth/authSelectors";
import {
  getAllCommentsByPostId,
  addCommentByPostID,
  getAllPosts,
  getOwnPosts,
} from "../redux/posts/postsOperation";

export default function CommentsScreen() {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const route = useRoute();
  const { postId, imgUri } = route.params;
  const comments = useSelector(postsSelectors.getComments);
  const sortedComments = [...comments].sort(
    (a, b) => b.dateForSort - a.dateForSort
  );
  const { userId } = useSelector(authSelectors.getUser);

  useEffect(() => {
    dispatch(getAllCommentsByPostId(postId));

    return () => {
      dispatch(getAllPosts());
      dispatch(getOwnPosts());
    };
  }, [dispatch, postId]);

  const createPost = () => {
    dispatch(addCommentByPostID(postId, comment));
    setComment("");
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={sortedComments}
        ListHeaderComponent={
          <View style={{ paddingVertical: 32 }}>
            <Image style={styles.image} source={{ uri: imgUri }} />
          </View>
        }
        renderItem={({ item }) => {
          const isOwner = item.authorId === userId;
          return (
            <View
              style={[
                styles.containerItem,
                { flexDirection: isOwner ? "row-reverse" : "row" },
              ]}
            >
              <View
                style={[
                  styles.containerUser,
                  { [isOwner ? "marginLeft" : "marginRight"]: 16 },
                ]}
              >
                <Image
                  source={{ uri: item.userAvatar }}
                  style={styles.authorAvatar}
                />
                <Text style={styles.textAuthor}>{item.authorName}</Text>
              </View>
              <View
                style={[
                  styles.commentWrapper,
                  {
                    [isOwner
                      ? "borderTopRightRadius"
                      : "borderTopLeftRadius"]: 0,
                  },
                ]}
              >
                <Text style={styles.textAuthor}>{item.comment}</Text>
                <Text
                  style={[
                    styles.commentDate,
                    { textAlign: isOwner ? "left" : "right" },
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        ListEmptyComponent={
          <View
            style={{
              height: 50,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>You don't have any comments</Text>
          </View>
        }
        ListFooterComponent={() => <View style={{ height: 30 }} />}
      />
      <KeyboardAvoidingView>
        <View style={styles.containerFooter}>
          <View>
            <TextInput
              value={comment}
              onChangeText={(text) => setComment(text)}
              placeholder="Comment..."
              placeholderTextColor="#BDBDBD"
              style={styles.commentInput}
            />
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={createPost}
              activeOpacity={0.7}
            >
              <AntDesign
                name="arrowup"
                size={34}
                style={styles.svgArrow}
                opacity={0.6}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  containerUser: {
    alignItems: "center",
  },

  containerItem: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,

    backgroundColor: " rgba(0, 0, 0, 0.03)",
    borderRadius: 16,
  },
  textAuthor: {
    marginBottom: 8,

    fontFamily: "RobotoRegular",
    fontSize: 13,
    lineHeight: 18,

    color: "#212121",
  },
  commentDate: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    lineHeight: 12,

    color: "#BDBDBD",
  },

  containerFooter: {
    paddingHorizontal: 16,
    paddingBottom: 16,

    backgroundColor: "#FFFFFF",
  },
  commentInput: {
    position: "relative",

    fontFamily: "RobotoMedium",
    height: 50,
    padding: 16,
    paddingRight: 50,

    fontSize: 16,
    lineHeight: 19,

    backgroundColor: "#F6F6F6",
    color: "#212121",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  iconWrapper: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  svgArrow: {
    alignSelf: "center",
    color: "#FFFFFF",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});
