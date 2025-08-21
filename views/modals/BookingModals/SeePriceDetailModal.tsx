import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

type Props = {
  price: number;
  onCloseModal: (state: boolean) => void;
};

export default function SeePriceDetailModal({ price, onCloseModal }: Props) {
  const nightsState = useSelector((state: any) => state.DateReducer.nights);

  return (
    <TouchableWithoutFeedback onPress={() => onCloseModal(false)}>
      <View style={styles.outsideModal}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <View style={styles.header}>
              <View />

              <Text style={styles.headerTitle}>Chi tiết giá</Text>

              <Ionicons
                name="close"
                size={24}
                color="black"
                onPress={() => onCloseModal(false)}
              />
            </View>

            <View style={styles.container}>
              <View style={styles.upContainer}>
                <Text style={styles.upContainerTitle}>
                  {nightsState} đêm x ₫{price.toLocaleString()}
                </Text>

                <Text style={styles.upContainerTitle}>
                  ₫{(nightsState * price).toLocaleString()}
                </Text>
              </View>

              <View style={styles.downContainer}>
                <Text style={styles.downContainerTitle}>Tổng VND</Text>

                <Text style={styles.downContainerTitle}>
                  ₫{(nightsState * price).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  outsideModal: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  modal: {
    height: "20%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 10,
  },
  upContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  upContainerTitle: {
    fontSize: 16,
  },
  downContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  downContainerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
