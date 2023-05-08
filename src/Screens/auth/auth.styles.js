import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "RobotoRegular",
  },

  imgBg: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  regScr: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    width: "100%",
    height: "69%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    position: "relative",
  },

  avatarWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
  },
  
  title: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },

  regForm: {
    marginTop: 33,
    gap: 16,
  },

  input: {
    height: 50,
    width: 343,
    marginHorizontal: 16,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderRadius: 8,

    color: "#212121",
    fontSize: 16,
  },

  inputPass: {
    position: "relative",
  },

  showPass: {
    position: "absolute",
    right: 10,
    top: 0,
    fontSize: 16,
    padding: 17,
  },
  textShowPass: {
    color: "#1B4371",
  },

  btn: {
    marginTop: 27,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    padding: 16,
    alignItems: "center",
    borderRadius: 100,
  },

  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },

  haveAnAccount: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
});
