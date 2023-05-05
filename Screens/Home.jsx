import React from "react";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";


const HomeTab = createBottomTabNavigator();

export default function Home() {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Profile") {
            return <Feather name="user" size={size} color={color} />;
          } else if (route.name === "Create Posts") {
            return (
              <Feather
                name="plus"
                size={size}
                color="#fff"
                style={styles.addPost}
              />
            );
          } else if (route.name === "Posts") {
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
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: true,
          header: ({ _, route }) => (
            <View style={styles.container}>
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
        name="Create Posts"
        component={CreatePostsScreen}
        options={{
          headerShown: true,
          header: ({ _, route }) => (
            <View style={styles.container}>
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
        options={{ headerShown: false,}}
      />
    </HomeTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    fontFamily: "RobotoRegular",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 11,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  returnSvg: {
    position: "absolute",
    left: 16,
    bottom: 10,
  },
  exitSvg: {
    position: "absolute",
    right: 16,
    bottom: 10,
  },
  exitProfile: {
    position: "absolute",
    right: 16,
    bottom: 0,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  addPost: {
    textAlign: "center",
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 20,
    paddingTop: 9,
  },
});
