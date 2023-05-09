import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { authStyles as styles } from "./auth.styles";
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

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authOperations";

const iFocus = {
  email: false,
  password: false,
};

const iState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(iFocus);
  const [state, setState] = useState(iState);
  const [showPassword, setShowPassword] = useState(true);

  const handleFocus = (input) => {
    setIsFocused((p) => ({ ...p, [input]: true }));
  };
  const handleBlur = (input) => {
    setIsFocused((p) => ({ ...p, [input]: false }));
  };

  const handleSubmit = () => {
    if (state.email === "" || state.password === "") {
      Toast.show({
        type: "error",
        text1: "Form error:",
        text2: "Email and Password must be filled .",
      });
      return;
    }
    dispatch(login(state));
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
            <Text style={{ ...styles.title, marginTop: 32 }}>Log In</Text>

            <View style={styles.regForm}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isFocused.email ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isFocused.email ? "white" : "#F6F6F6",
                }}
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
                placeholder="E-mail"
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
                    placeholder="Password"
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
                  title="Login"
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}> Log in </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  title="Registration"
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.haveAnAccount}>
                    Don't have an account? Registration
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
