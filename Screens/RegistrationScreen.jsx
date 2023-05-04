import React, { useState } from "react";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
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
  login: false,
};

const iState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
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
     console.log("login:", state.login);
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
            <View style={styles.avatarBox}>
              <Image
                style={styles.avatarImg}
                source={require("../assets/img/noAvatar.png")}
              />
              <AntDesign
                name="closecircleo"
                style={styles.addRemovePhoto}
                size={25}
                color="#FF6C00"
                backgroundColor="white"
              />
            </View>

            <Text style={styles.title}>Registration</Text>

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
                      setState((p) => ({...p, password: value }))
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

                <Text style={styles.goLogin}>
                  Already have an account? Log in
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
    width: "100%",
    height: "69%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    position: "relative",
  },

  avatarBox: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -60,
  },
  avatarImg: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
    resizeMode: "contain",
  },

  addRemovePhoto: {
    position: "absolute",
    left: 108,
    top: 80,
    borderRadius: 12.5,
  },

  title: {
    marginTop: 92,
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
    right: 32,
    top: 16,
    color: "#1B4371",
    fontSize: 16,
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
  goLogin: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
});
