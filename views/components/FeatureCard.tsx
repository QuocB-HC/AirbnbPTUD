import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { Feature } from "../../models/feature.model";

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <View style={styles.featureContainer}>
      <View style={styles.featureIconContainer}>
        <Svg
          width={32}
          height={32}
          viewBox="0 0 32 32" // chỉnh theo kích thước gốc icon
          fill="none"
        >
          <Path d={feature.icon_path} fill={"black"} />
        </Svg>
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureName}>{feature.name}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featureContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  featureIconContainer: {
    width: "15%",
    alignItems: "center",
  },
  featureIcon: {},
  featureContent: {
    width: "95%",
  },
  featureName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  featureDescription: {
    fontSize: 18,
    color: 'gray',
  },
});
