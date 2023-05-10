import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import uploadPhotoToServer, { firebaseStore } from "../api/uploadPhotoToServer";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "../redux/auth/authSelectors";
import { authUpdateAvatar, deleteAvatar } from "../redux/auth/authOperations";

export default function Avatar({ avatarImg, setAvatarImg }) {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  const addImage = async () => {

    if (avatarImg) {
      dispatch(authUpdateAvatar(""));
      setAvatarImg("");
      return;
    }

    // if (avatarImg && user.currentUser) {
    //     dispatch(authUpdateAvatar(""));
      // dispatch(deleteAvatar(avatarImg, ""));
    //   setAvatarImg("");
    //   return;
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoUrl = await uploadPhotoToServer(
        result.assets[0].uri,
        firebaseStore.avatar
      );
      setAvatarImg(photoUrl);

      if (user.currentUser) {
        dispatch(authUpdateAvatar(photoUrl));
      }
    }
  };

  return (
    <View style={styles.container}>
      {avatarImg && <Image style={styles.img} source={{ uri: avatarImg }} />}
      <TouchableOpacity style={styles.btn} onPress={addImage}>
        {avatarImg ? (
          <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
        ) : (
          <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  btn: {
    position: "absolute",
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
});
