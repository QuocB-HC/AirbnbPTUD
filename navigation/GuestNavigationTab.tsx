import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WishlistScreen from "../views/screens/customer/WishlistScreen";
import TripsScreen from "../views/screens/customer/TripsScreen";
import InboxScreen from "../views/screens/customer/InboxScreen";
import ProfileScreen from "../views/screens/customer/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ExploreNavigation from "./ExploreNavigation";

const Tab = createBottomTabNavigator();

export default function GuestNavigationTab() {
  return (
    <Tab.Navigator
      initialRouteName="Explore Screen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Explore Screen") {
            iconName = focused ? "search" : "search-outline";
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Wishlist Screen") {
            iconName = focused ? "heart" : "heart-outline";
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Trips Screen") {
            iconName = focused ? "airbnb" : "airbnb";
            return (
              <FontAwesome5 name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Inbox Screen") {
            iconName = focused ? "chatbox" : "chatbox-outline";
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Profile Screen") {
            iconName = focused ? "account-circle" : "account-circle-outline";
            return (
              <MaterialCommunityIcons
                name={iconName as any}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Explore Screen" component={ExploreNavigation} />
      <Tab.Screen name="Wishlist Screen" component={WishlistScreen} />
      <Tab.Screen name="Trips Screen" component={TripsScreen} />
      <Tab.Screen name="Inbox Screen" component={InboxScreen} />
      <Tab.Screen name="Profile Screen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
