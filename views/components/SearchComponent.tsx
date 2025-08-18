import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SearchModal from "../modals/SearchModals/SearchModal";

export default function SearchComponent({ navigation }: any) {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setIsOpenSearchModal(true)}>
        {/* Icon search */}
        <Ionicons
          name="search"
          size={30}
          color="#000"
          style={styles.searchIcon}
        />

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Where to?</Text>
          <Text style={styles.subText}>Anywhere · Any week · Add guests</Text>
        </View>

        {/* Icon filter */}
        <View style={styles.filterButton}>
          <Ionicons name="options-outline" size={25} color="#000" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpenSearchModal}
        transparent={true}
        animationType="fade"
      >
        <SearchModal onCloseModal={() => setIsOpenSearchModal(false)} navigation={navigation} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 15,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    margin: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  subText: {
    color: "gray",
    fontSize: 12,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
