import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from 'react-redux';
import authSelectors from "./redux/auth/authSelectors";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/mainSreen/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function SrcApp() {
    const {currentUser} = useSelector(authSelectors.getUser);;
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
            options={{ headerShown: true }}
          />
          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: true }}
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
