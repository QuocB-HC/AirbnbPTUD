import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../views/screens/ExploreScreen";
import AccommodationDetail from "../views/screens/AccommodationDetail";
import SearchResultScreen from "../views/screens/SearchResultScreen";

const Stack = createNativeStackNavigator();

export default function ListToDetail() {
  return (
    <Stack.Navigator initialRouteName="Accommodation List">
      <Stack.Screen
        name="Accommodation List"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Accommodation Detail"
        component={AccommodationDetail}
        options={{ 
          headerShown: false
         }}
      />
      <Stack.Screen
        name="Search Result"
        component={SearchResultScreen}
        options={{ 
          headerShown: false 
        }}
      />
    </Stack.Navigator>
  );
}
