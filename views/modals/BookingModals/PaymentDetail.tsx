import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InputPaymentDetailModal from "./InputPaymentDetailModal";

type PaymentProps = {
  onCloseModal: (state: boolean) => void;
  onPrevious: (state: boolean) => void;
  onContinue: (state: boolean) => void;
};

const PaymentDetail = ({
  onCloseModal,
  onPrevious,
  onContinue,
}: PaymentProps) => {
  const [isOpenInputPaymentDetailModal, setIsOpenInputPaymentDetailModal] =
    useState(false);

  const nextStep = () => {
    setIsOpenInputPaymentDetailModal(false);
    onContinue(true);
  };

  return (
    <View style={styles.modal}>
      <Ionicons
        style={styles.closeButton}
        name="close"
        size={24}
        color="black"
        onPress={() => onCloseModal(false)}
      />

      <Ionicons
        style={styles.backButton}
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => onPrevious(true)}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Thêm phương thức thanh toán</Text>

        <View style={styles.paymentContainer}>
          <FontAwesome name="credit-card" size={24} color="black" />

          <View>
            <Text>Thẻ tín dụng hoặc thẻ ghi nợ</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.paymentIcon}
                source={require("../../../assets/images/visa-logo.png")}
              />
              <Image
                style={styles.paymentIcon}
                source={require("../../../assets/images/mastercard-logo.png")}
              />
            </View>
          </View>

          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: "black",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: "white",
                borderRadius: 50,
              }}
            ></View>
          </View>
        </View>
      </View>

      {/* Stepper + Continue */}
      <View style={styles.continueContainer}>
        <View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            gap: 5,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, backgroundColor: "black", height: 3 }}></View>
          <View style={{ flex: 1, backgroundColor: "black", height: 3 }}></View>
          <View
            style={{ flex: 1, backgroundColor: "lightgray", height: 3 }}
          ></View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => setIsOpenInputPaymentDetailModal(true)}
        >
          <Text style={styles.continueText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" visible={isOpenInputPaymentDetailModal}>
        <InputPaymentDetailModal
          onCloseModal={() => setIsOpenInputPaymentDetailModal(false)}
          onContinue={() => nextStep()}
        />
      </Modal>
    </View>
  );
};

export default PaymentDetail;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  continueContainer: {
    position: "absolute",
    width: "100%",
    height: "10%",
    bottom: 0,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: "80%",
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  paymentContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    height: "30%",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentIcon: {
    height: 20,
    width: 30,
    objectFit: "contain",
  },
});
