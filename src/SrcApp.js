import "react-native-gesture-handler";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import authSelectors from "./redux/auth/authSelectors";
import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/mainSreen/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import ReturnIcon from "./Components/ReturnIcon";
import { mainStyles as styles } from "./Screens/mainSreen/main.styles";

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function SrcApp() {
  const { currentUser } = useSelector(authSelectors.getUser);
  return (
    <NavigationContainer>
      {currentUser ? (
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              headerShown: true,
              header: ({ _, route }) => (
                <View style={styles.homeContainer}>
                  <ReturnIcon />
                  <Text style={styles.title}>{route.name}</Text>
                </View>
              ),
            }}
          />
          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: true,
              header: ({ _, route }) => (
                <View style={styles.homeContainer}>
                  <ReturnIcon />
                  <Text style={styles.title}>{route.name}</Text>
                </View>
              ),
            }}
          />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
