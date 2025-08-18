import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { Amenity } from "../../../models/amenity.model";

type AmenitiesModalProps = {
  amenities: Amenity[];
  onCloseModal: (state: boolean) => void;
};

export default function AmenitiesModal({
  amenities,
  onCloseModal,
}: AmenitiesModalProps) {
  // Nhóm amenities theo category
  const grouped = amenities.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Amenity[]>);

  return (
    <Pressable style={styles.outsideModal} onPress={() => onCloseModal(false)}>
      <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
        <View style={styles.modalHeader}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => onCloseModal(false)}
          />
          <Text/>
        </View>

        <ScrollView
          style={styles.modalContainer}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.modalTitle}>Nơi này có những gì cho bạn</Text>

          {Object.entries(grouped).map(([category, items]) => (
            <View key={category} style={{ marginBottom: 40, gap: 15 }}>
              <Text style={{ fontSize: 18, marginBottom: 8 }}>{category}</Text>
              {items.map((amenity) => (
                <View key={amenity.id} style={styles.item}>
                  <Svg width={30} height={30} viewBox="0 0 32 32" fill="none">
                    <Path d={amenity.icon_path} fill={"black"} />
                  </Svg>
                  <Text>{amenity.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outsideModal: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    width: "100%",
    height: "95%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  modalContainer: {
    paddingHorizontal: 20,
  },
  modalHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    gap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    paddingBottom: 20,
  },
});
