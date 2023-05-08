import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authStyles as styles } from "./auth.styles";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { register } from "../../redux/auth/authOperations";
import Avatar from "../../Components/Avatar";

const iFocus = {
  email: false,
  password: false,
  login: false,
};

const iState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(iFocus);
  const [state, setState] = useState(iState);
  const [showPassword, setShowPassword] = useState(true);
  const [avatarImg, setAvatarImg] = useState("");

  const handleFocus = (input) => {
    setIsFocused((p) => ({ ...p, [input]: true }));
  };
  const handleBlur = (input) => {
    setIsFocused((p) => ({ ...p, [input]: false }));
  };

  const handleSubmit = () => {
    if (avatarImg === "") {
      Toast.show({
        type: "error",
        text1: "Avatar error:",
        text2: "Avatar must be filled",
      });
      return;
    }
    if (
      values.email === "" ||
      values.password === "" ||
      values.nickname === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Form error:",
        text2: "Email, Password and Nickname must be filled.",
      });
      return;
    }
    dispatch(register(state));
    setState(iState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBg}
          source={require("../../../assets/img/PhotoBG.jpg")}
        >
          <View style={styles.regScr}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Avatar avatarImg={avatarImg} setAvatarImg={setAvatarImg} />
              </View>
            </View>

            <Text style={{ ...styles.title, marginTop: 92 }}>Registration</Text>

            <View style={styles.regForm}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocused.login ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isFocused.login ? "white" : "#F6F6F6",
                }}
                placeholder="Login"
                value={state.login}
                onChangeText={(value) =>
                  setState((p) => ({ ...p, login: value }))
                }
                onFocus={() => {
                  handleFocus("login");
                }}
                onBlur={() => {
                  handleBlur("login");
                }}
              />

              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocused.email ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isFocused.email ? "white" : "#F6F6F6",
                }}
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="E-mail"
                value={state.email}
                onChangeText={(value) =>
                  setState((p) => ({ ...p, email: value }))
                }
                onFocus={() => {
                  handleFocus("email");
                }}
                onBlur={() => {
                  handleBlur("email");
                }}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.inputPass}>
                  <TextInput
                    secureTextEntry={showPassword}
                    style={{
                      ...styles.input,
                      borderColor: isFocused.password ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isFocused.password ? "white" : "#F6F6F6",
                    }}
                    placeholder="Password"
                    value={state.password}
                    onChangeText={(value) =>
                      setState((p) => ({ ...p, password: value }))
                    }
                    onFocus={() => {
                      handleFocus("password");
                    }}
                    onBlur={() => {
                      handleBlur("password");
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.showPass}
                  >
                    <Text style={styles.textShowPass}>
                      {showPassword ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>

              <View>
                <TouchableOpacity
                  style={styles.btn}
                  title="Register"
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}> Register </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  title="Register"
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.haveAnAccount}>
                    Already have an account? Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
