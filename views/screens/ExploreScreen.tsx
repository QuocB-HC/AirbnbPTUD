import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SearchComponent from "../components/SearchComponent";
import AccommodationCard from "../components/AccommodationCard";
import { useNavigation } from "@react-navigation/native";
import { fetchAccommodations } from "../../api/accommodation.api";
import { Accommodation } from "../../models/accommodation.model";

export default function ExploreScreen() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const result: Accommodation[] = await fetchAccommodations();
      setAccommodations(result);
    };

    load();
  }, []);

  if (accommodations.length == 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.searchContainer}>
              <SearchComponent />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "80%",
              }}
            >
              <Text>Không tìm thấy chỗ ở</Text>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchComponent navigation={navigation} />
          </View>

          <FlatList
            style={styles.accommodationList}
            data={accommodations}
            keyExtractor={(accommodation) => accommodation.id.toString()}
            renderItem={({ item }) => (
              <AccommodationCard accommodation={item} navigation={navigation} />
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  searchContainer: {
    height: "15%",
    borderBottomWidth: 0.3,
    borderBottomColor: "gray",
  },
  accommodationList: {
    height: "85%",
    padding: 20,
  },
});
