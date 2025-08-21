import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Amenity } from "../../../models/amenity.model";
import { getAllamenity } from "../../../api/amenity.api";
import Svg, { Path } from "react-native-svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddAmenityModal from "../../modals/AdminModal/AddAmenityModal";

export default function AmenityManagementScreen() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [isOpenAddAmenityModal, setIsOpenAddAmenityModal] = useState(false);

  useEffect(() => {
    const getAllAmenity = async () => {
      const result = await getAllamenity();

      setAmenities(result);
      console.log(result);
    };

    getAllAmenity();
  }, []);

  return (
    <>
      <ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsOpenAddAmenityModal(true)}
        >
          <AntDesign name="plus" size={20} color="black" />
        </TouchableOpacity>

        <View style={styles.container}>
          {/* Header */}
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerText]}>Name</Text>
            <Text style={[styles.cell, styles.headerText]}>Icon</Text>
            <Text style={[styles.cell, styles.headerText]}>Description</Text>
            <Text style={[styles.cell, styles.headerText]}>Category</Text>
          </View>

          {/* Body */}
          {amenities.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.cell}>{item.name}</Text>
              <View style={styles.cell}>
                <Svg width={30} height={30} viewBox="0 0 32 32" fill="none">
                  <Path d={item.icon_path} fill={"black"} />
                </Svg>
              </View>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{item.category}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal animationType="slide" visible={isOpenAddAmenityModal}>
        <AddAmenityModal onCloseModal={() => setIsOpenAddAmenityModal(false)} />
      </Modal>
    </>
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
});
