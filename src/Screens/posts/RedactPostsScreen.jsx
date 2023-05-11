import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { toastError } from "../../helpers/toastMessage";
import { deleteP, getAllPosts, updatePost } from "../../redux/posts/postsOperation";
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
import { useRoute } from "@react-navigation/native";



const iState = {
  title: "",
  place: "",
};

const iFocus = {
  title: false,
  place: false,
};

export default function RedactPostScreen({ navigation }) {
  const [state, setState] = useState(iState);
  const [isFocused, setIsFocused] = useState(iFocus);
  const [disabled, setDis] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const { imgUri, title, place, id } = route.params;

  useEffect(() => {
    setState({ title, place });
  }, []);

  const redactPost = async () => {
    if (!state.title || !state.place) {
      toastError({ message: "All fields must be completed" });
      return;
    }

    setDis(true);
    Keyboard.dismiss();

    const payload = {
      title: state.title,
      location: state.place,
    };

    dispatch(updatePost(id, payload));

    setState(iState);
    setDis(false);

    navigation.goBack();
  };

  const deletePost = () => {
    dispatch(deleteP(id, imgUri));
    navigation.goBack();
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
        <View style={styles.photoContainer}>
          <Image source={{ uri: imgUri }} style={styles.photo} />
        </View>

        <Text style={styles.mainText}>Redact photo</Text>

        <View style={styles.form}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
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
              onPress={redactPost}
            >
              <Text style={styles.uploadBtnTitleActive}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteBtn}
              onPress={deletePost}
            >
              <AntDesign
                style={styles.deleteSvg}
                name="delete"
                size={25}
                color="#DADADA"
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}

