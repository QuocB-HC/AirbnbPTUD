import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Accommodation } from "../../../models/accommodation.model";
import { useNavigation } from "@react-navigation/native";
import { getAccommodationByHostId } from "../../../api/accommodation.api";
import { getUserId } from "../../../services/authService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HostAccommodationStackParamList } from "../../../navigation/HostAccommodationNavigation";

type NavigationProp = NativeStackNavigationProp<
  HostAccommodationStackParamList,
  "Accommodation Table"
>;

export default function AccommodationManagementScreen() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const getAccommodation = async () => {
      const host_id = await getUserId();

      if (host_id) {
        const result = await getAccommodationByHostId(host_id);
        setAccommodations(result);
      }
    };

    getAccommodation();
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Name</Text>
        <Text style={[styles.cell, styles.headerText]}>Type</Text>
        <Text style={[styles.cell, styles.headerText]}>Price</Text>
        <Text style={[styles.cell, styles.headerText]}>Action</Text>
      </View>

      {/* Body */}
      {accommodations.map((accommodation) => (
        <View key={accommodation.id} style={styles.row}>
          <Text style={styles.cell}>{accommodation.name}</Text>
          <Text style={styles.cell}>{accommodation.property_type}</Text>
          <Text style={styles.cell}>
            {accommodation.price_per_night.toLocaleString()}đ
          </Text>
          <View style={styles.cell}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("Accommodation Detail", {
                  accommodation: accommodation,
                  screenOptions: { tabBarStyle: { display: "none" } },
                })
              }
            >
              <Text style={styles.actionText}>Detail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("Accommodation Image", {
                  id: accommodation.id,
                  screenOptions: { tabBarStyle: { display: "none" } },
                })
              }
            >
              <Text style={styles.actionText}>Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    top: 20,
    right: 30,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    margin: 20,
    marginTop: 80,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  actionButton: {
    height: 40,
    width: "100%",
    backgroundColor: "#FF385C",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  actionText: {
    color: "white",
  },
});
