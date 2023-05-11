import React from "react";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { mainStyles as styles } from "./main.styles";

import LogOutIcon from "../../Components/LogoutIcon";
import CreatePostsScreen from "../posts/CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import ReturnIcon from "../../Components/ReturnIcon";

const HomeTab = createBottomTabNavigator();

export default function Home() {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Profile") {
            return <Feather name="user" size={size} color={color} />;
          } else if (route.name === "CreatePosts") {
            return (
              <Feather
                name="plus"
                size={size}
                color="#fff"
                style={styles.addPost}
              />
            );
          } else if (route.name === "PostsScreen") {
            return <SimpleLineIcons name="grid" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarShowLabel: false,
        initialRouteName: "PostsScreen",
      })}
    >
      <HomeTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: true,
          header: ({ _, route }) => (
            <View style={styles.homeContainer}>
              <Text style={styles.title}>{route.name}</Text>
              <LogOutIcon />
            </View>
          ),
        }}
      />
      <HomeTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerShown: true,
          tabBarStyle: { display: "none" },
          header: ({ _, route }) => (
            <View style={styles.homeContainer}>
              <ReturnIcon />
              <Text style={styles.title}>{route.name}</Text>
            </View>
          ),
        }}
      >
      </HomeTab.Screen>
      <HomeTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </HomeTab.Navigator>
  );
}


