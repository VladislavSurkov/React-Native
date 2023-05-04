import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const iFocus = {
  email: false,
  password: false,
};

const iState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isFocused, setIsFocused] = useState(iFocus);
  const [state, setState] = useState(iState);
  const [showPassword, setShowPassword] = useState(true);
  const [fontsLoaded] = useFonts({
    RobotoBold: require("../assets/fonts/RobotoBold.ttf"),
    RobotoMedium: require("../assets/fonts/RobotoMedium.ttf"),
    RobotoRegular: require("../assets/fonts/RobotoRegular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleFocus = (input) => {
    setIsFocused((p) => ({ ...p, [input]: true }));
  };
  const handleBlur = (input) => {
    setIsFocused((p) => ({ ...p, [input]: false }));
  };

  const handleSubmit = () => {
    console.log("email:", state.email);
    console.log("password:", state.password);
    setState(iState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBg}
          source={require("../assets/img/PhotoBG.jpg")}
        >
          <View style={styles.regScr}>
            <Text style={styles.title}>Log In</Text>

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

                <Text style={styles.goRegister}>
                  Don't have an account? Registration
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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

  title: {
    marginTop: 32,
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
    borderColor: "#E8E8E8",

    color: "#212121",
    placeholderTextColor: "#BDBDBD",
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

  goRegister: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
});
