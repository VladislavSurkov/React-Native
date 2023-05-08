import React from "react";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { mainStyles as styles } from "./main.styles";

import CreatePostsScreen from "../CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";

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
              <Ionicons
                name="exit-outline"
                style={styles.exitSvg}
                size={28}
                color="#BDBDBD"
                backgroundColor="transparent"
              />
            </View>
          ),
        }}
      />
      <HomeTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerShown: true,
          header: ({ _, route }) => (
            <View style={styles.homeContainer}>
              <AntDesign
                name="arrowleft"
                style={styles.returnSvg}
                size={28}
                color={"#BDBDBD"}
                backgroundColor={"transparent"}
                header={20}
              />
              <Text style={styles.title}>{route.name}</Text>
            </View>
          ),
        }}
      />
      <HomeTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </HomeTab.Navigator>
  );
}

