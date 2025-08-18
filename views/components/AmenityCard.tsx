import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { Amenity } from "../../models/amenity.model";

type AmenityProp = {
  amenity: Amenity;
};

export default function AmenityCard({ amenity }: AmenityProp) {
  return (
    <View style={styles.amenityContainer}>
      <View style={styles.svgContainer}>
        <Svg
          width={40}
          height={40}
          viewBox="0 0 32 32" // chỉnh theo kích thước gốc icon
          fill="none"
        >
          <Path d={amenity.icon_path} fill={"black"} />
        </Svg>
      </View>

      <Text style={styles.amenityName}>{amenity.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  amenityContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 5,
  },
  svgContainer: {
    width: "15%",
    justifyContent: "center",
  },
  amenityName: {
    fontSize: 18,
    marginLeft: 5,
  },
});
