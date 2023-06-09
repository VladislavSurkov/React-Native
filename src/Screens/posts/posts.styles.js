import { StyleSheet } from "react-native";

export const postsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  wrapper: {
    width: 343,
    height: "100%",
    position: "relative",
  },
  photoContainer: {
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  svgConatiner: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
  },
  mainText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  form: {
    justifyContent: "center",
  },
  inputName: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
  },
  inputLocation: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    paddingLeft: 34,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
  },
  iconLocation: {
    justifyContent: "center",
    marginBottom: -38,
  },
  uploadBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
    width: 343,
    height: 51,
  },
  uploadBtnActive: {
    borderRadius: 100,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
    width: 343,
    height: 51,
  },
  uploadBtnTitle: {
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  uploadBtnTitleActive: {
    color: "#FFFFFF",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
  deleteSvg: {
    alignSelf: "center",
  },
});
