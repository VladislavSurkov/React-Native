import { StyleSheet } from "react-native";


export const mainStyles = StyleSheet.create({
  homeContainer: {
    position: "relative",
    fontFamily: "RobotoRegular",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 11,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  postsContainer: {
    marginHorizontal: 16,
  },

  profileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    fontFamily: "RobotoRegular",
  },

  //Home Navigate
  exitProfile: {
    position: "absolute",
    right: 16,
    bottom: 0,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  addPost: {
    textAlign: "center",
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 20,
    paddingTop: 9,
  },

  // PostsScreen
  postsAvatarContainer: {
    flexDirection: "row",
    marginVertical: 32,
    alignItems: "center",
  },

  postsAvatarImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },

  postsAvatarData: {
    marginLeft: 8,
  },

  postsAvatarName: {
    color: "#212121",
    fontFamily: "RobotoBold",
    fontSize: 13,
    lineHeight: 15,
  },

  postsAvatarEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
  },

  // Profile
  profileImgBg: {
    flex: 1,
    resizeMode: "contain",
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  profileRegScr: {
    position: "relative",
    flex: 1,
    marginTop: 147,
    paddingTop: 92,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profileAvatarBox: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  profileAvatarImg: {
    position: "absolute",
  },
  exitBtn: {
    position: "absolute",
    right: 0,
    top: 30,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 30,
  },

  profileAvatarName: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
    alignSelf: "center",
  },
});