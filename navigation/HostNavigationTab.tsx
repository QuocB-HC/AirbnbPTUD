import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { signOut } from "../services/authService";
import BookingManageScreen from "../views/screens/host/BookingManageScreen";
import HostAccommodationNavigation from "./HostAccommodationNavigation";

const Tab = createBottomTabNavigator();

function SignOutScreen() {
  React.useEffect(() => {
    const doLogout = async () => {
      await signOut();
    };
    doLogout();
  }, []);

  return null;
}

export default function HostNavigationTab() {
  return (
    <Tab.Navigator
      initialRouteName="Accommodation"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Accommodation") {
            iconName = focused ? "home" : "home-outline";
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Booking") {
            iconName = focused ? "history" : "history";
            return (
              <MaterialIcons name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Sign Out") {
            iconName = focused ? "exit-to-app" : "exit-to-app";
            return (
              <MaterialIcons name={iconName as any} size={size} color={color} />
            );
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Accommodation" component={HostAccommodationNavigation} />
      <Tab.Screen name="Booking" component={BookingManageScreen} />
      <Tab.Screen name="Sign Out" component={SignOutScreen} />
    </Tab.Navigator>
  );
}
