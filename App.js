import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import Toast from "react-native-toast-message";

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SrcApp from './src/SrcApp';


export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./assets/fonts/RobotoBold.ttf"),
    RobotoMedium: require("./assets/fonts/RobotoMedium.ttf"),
    RobotoRegular: require("./assets/fonts/RobotoRegular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
          <SrcApp />
          <Toast />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
