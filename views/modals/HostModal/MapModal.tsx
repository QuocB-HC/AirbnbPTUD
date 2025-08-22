import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MapView, { Marker } from "react-native-maps";
import { Accommodation } from "../../../models/accommodation.model";

type Props = {
  accommodation: Accommodation;
  onCloseModal: (state: boolean) => void;
};

export default function MapModal({ accommodation, onCloseModal }: Props) {
  return (
    <View style={styles.modal}>
      <View style={styles.header}>
        <AntDesign
          name="close"
          size={24}
          color="black"
          onPress={() => onCloseModal(false)}
        />
      </View>

      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: accommodation.latitude!,
            longitude: accommodation.longitude!,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: accommodation.latitude!,
              longitude: accommodation.longitude!,
            }}
            title={accommodation.name}
            description={`${accommodation.city}, ${accommodation.country}`}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  container: {
    height: "90%",
    width: "100%",
  },
});
