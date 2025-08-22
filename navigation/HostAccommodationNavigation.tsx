import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccommodationManagementScreen from "../views/screens/host/AccommodationManagementScreen";
import AccommodationDetailManagement from "../views/screens/host/AccommodationDetailManagement";
import AccommodationImageManagement from "../views/screens/host/AccommodationImageManagement";
import { Accommodation } from "../models/accommodation.model";

export type HostAccommodationStackParamList = {
  "Accommodation Table": undefined;
  "Accommodation Detail": { accommodation: Accommodation; screenOptions: any };
  "Accommodation Image": { id: string; screenOptions: any };
};

const Stack = createNativeStackNavigator<HostAccommodationStackParamList>();

export default function HostAccommodationNavigation() {
  return (
    <Stack.Navigator initialRouteName="Accommodation Table">
      <Stack.Screen
        name="Accommodation Table"
        component={AccommodationManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Accommodation Detail"
        component={AccommodationDetailManagement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Accommodation Image"
        component={AccommodationImageManagement}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
