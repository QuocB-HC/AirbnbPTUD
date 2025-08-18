import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type DescripionModalProp = {
  description: any;
  onCloseModal: any;
};

export default function DescripionModal({
  description,
  onCloseModal,
}: DescripionModalProp) {
  return (
    <ScrollView style={styles.modal}>
      <View style={styles.modalHeader}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => onCloseModal(false)}
        />
        <Text />
      </View>
      <View style={styles.modalBody}>
        <Text style={styles.modalTitle}>Giới thiệu về chỗ ở này</Text>
        <Text>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  modalHeader: {
    height: "auto",
    paddingTop: 50,
    paddingLeft: 20,
    flexDirection: "row",
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
