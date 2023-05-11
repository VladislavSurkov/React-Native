import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import uuid from "react-native-uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { toastError } from "../../helpers/toastMessage";
import { CameraComponent } from "../../Components/Camera";
import uploadPhotoToServer, { firebaseStore } from "../../api/uploadPhotoToServer";
import { uploadPostToServer } from "../../redux/posts/postsOperation";
import { postsStyles as styles } from "./posts.styles";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const iState = {
  title: "",
  place: "",
};

const iFocus = {
  title: false,
  place: false,
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(iState);
  const [isFocused, setIsFocused] = useState(iFocus);
  const [location, setLocation] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [disabled, setDis] = useState(false);
  const dispatch = useDispatch();

  const makePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    setPhoto(photo.uri);
    setLocation(location.coords);
    await MediaLibrary.createAssetAsync(photo.uri);
  };

  const openCamera = async () => {
    setPhoto(null);
    setLocation(null);
    setCameraRef(cameraRef);
  };

  const uploadPhoto = async () => {
    if (!photo || !state.title || !state.place) {
      toastError({ message: "All fields must be completed" });
      return;
    }
    setDis(true);
    Keyboard.dismiss();

    const photoUrl = await uploadPhotoToServer(photo, firebaseStore.post);
    const data = {
      ...state,
      photo: photoUrl,
      location,
      createdAt: Date.now(),
    };
    const newPost = {
      id: uuid.v4(),
      title: data.title,
      messageCount: 0,
      likeCount: 0,
      imgUri: data.photo,
      location: data.place,
      locationData: {
        latitude: data?.location?.latitude ?? 0,
        longitude: data?.location?.longitude ?? 0,
      },
      comments: [],
    };
    dispatch(uploadPostToServer(newPost));

    setState(iState);
    setPhoto("");
    setDis(false);
    navigation.navigate("PostsScreen");
  };

  const handleFocus = (input) => {
    setIsFocused((p) => ({ ...p, [input]: true }));
  };
  const handleBlur = (input) => {
    setIsFocused((p) => ({ ...p, [input]: false }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {photo ? (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <TouchableOpacity style={styles.svgConatiner} onPress={openCamera}>
              <Feather name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.photoContainer}>
            <CameraComponent
              location={location}
              photo={photo}
              makePhoto={makePhoto}
              setCameraRef={setCameraRef}
            />
          </View>
        )}
        <Text style={styles.mainText}>Upload photo</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <TextInput
              placeholder="Title..."
              style={{
                ...styles.inputName,
                borderColor: isFocused.title ? "#FF6C00" : "#E8E8E8",
              }}
              onFocus={() => {
                handleFocus("title");
              }}
              onBlur={() => {
                handleBlur("title");
              }}
              onChangeText={(value) =>
                setState((p) => ({ ...p, title: value }))
              }
              value={state.title}
            />
            <View>
              <EvilIcons
                style={styles.iconLocation}
                name="location"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                style={{
                  ...styles.inputLocation,
                  borderColor: isFocused.place ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Location..."
                onFocus={() => {
                  handleFocus("place");
                }}
                onBlur={() => {
                  handleBlur("place");
                }}
                value={state.place}
                onChangeText={(value) =>
                  setState((p) => ({ ...p, place: value }))
                }
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={disabled}
              style={{
                ...styles.uploadBtnActive,
                backgroundColor: disabled ? "#BDBDBD" : "#FF6C00",
              }}
              onPress={uploadPhoto}
            >
              <Text style={styles.uploadBtnTitleActive}>Upload</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}