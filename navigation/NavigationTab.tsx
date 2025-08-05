import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ExploreScreen from "../views/screens/ExploreScreen";
import WishlistScreen from "../views/screens/WishlistScreen";
import TripsScreen from "../views/screens/TripsScreen";
import InboxScreen from "../views/screens/InboxScreen";
import ProfileScreen from "../views/screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
  return (
    <NavigationContainer>
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
                <FontAwesome5
                  name={iconName as any}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Inbox Screen") {
              iconName = focused ? "chatbox" : "chatbox-outline";
              return (
                <Ionicons
                  name={iconName as any}
                  size={size}
                  color={color}
                />
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
        <Tab.Screen name="Explore Screen" component={ExploreScreen} />
        <Tab.Screen name="Wishlist Screen" component={WishlistScreen} />
        <Tab.Screen name="Trips Screen" component={TripsScreen} />
        <Tab.Screen name="Inbox Screen" component={InboxScreen} />
        <Tab.Screen name="Profile Screen" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
