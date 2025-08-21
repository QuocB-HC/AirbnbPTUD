import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HostManagementScreen from "../views/screens/admin/HostManagementScreen";
import AmenityManagementScreen from "../views/screens/admin/AmenityManagementScreen";
import FeatureManagementScreen from "../views/screens/admin/FeatureManagementScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { signOut } from "../services/authService";

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

export default function AdminNavigationTab() {
  return (
    <Tab.Navigator
      initialRouteName="Host"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Host") {
            iconName = focused ? "person" : "person-outline";
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Amenity") {
            iconName = focused ? "list-alt" : "list-alt";
            return (
              <FontAwesome name={iconName as any} size={size} color={color} />
            );
          } else if (route.name === "Feature") {
            iconName = focused ? "featured-play-list" : "featured-play-list";
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
      <Tab.Screen name="Host" component={HostManagementScreen} />
      <Tab.Screen name="Amenity" component={AmenityManagementScreen} />
      <Tab.Screen name="Feature" component={FeatureManagementScreen} />
      <Tab.Screen name="Sign Out" component={SignOutScreen} />
    </Tab.Navigator>
  );
}
