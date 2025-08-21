import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { HelperText, TextInput } from "react-native-paper";

type Props = {
  onCloseModal: (state: boolean) => void;
  onContinue: (state: boolean) => void;
};

const InputPaymentDetailModal = ({ onCloseModal, onContinue }: Props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const hasCardError = cardNumber.length > 0 && cardNumber.length < 16;

  const nextStep = () => {
    if (cardNumber == "" || expiry == "" || cvv == "" || postalCode == "") {
      Alert.alert("Thông báo", "Nhập đầy đủ thông tin");
      return;
    }

    onContinue(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.outsideModal}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View />

            <Text>Thêm thông tin thẻ</Text>

            <Ionicons
              name="close"
              size={24}
              color="black"
              onPress={() => onCloseModal(false)}
            />
          </View>

          <View style={styles.container}>
            <TextInput
              label="Số thẻ 🔒"
              value={cardNumber}
              onChangeText={setCardNumber}
              mode="outlined"
              keyboardType="numeric"
              error={hasCardError}
              style={styles.input}
              placeholder="0000 0000 0000 0000"
            />
            <HelperText type="error" visible={hasCardError}>
              ⚠ Kiểm tra số thẻ của bạn.
            </HelperText>

            <View style={styles.row}>
              <TextInput
                label="Ngày hết hạn"
                value={expiry}
                onChangeText={setExpiry}
                mode="outlined"
                style={[styles.input, styles.half]}
                placeholder="DD/MM"
              />
              <TextInput
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                mode="outlined"
                keyboardType="numeric"
                style={[styles.input, styles.half]}
                secureTextEntry
                placeholder="***"
              />
            </View>

            <TextInput
              label="Mã bưu chính"
              value={postalCode}
              onChangeText={setPostalCode}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          <View style={styles.continueContainer}>
            <TouchableOpacity onPress={() => onCloseModal(false)}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => nextStep()}
            >
              <Text style={styles.continueText}>Hoàn tất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputPaymentDetailModal;

const styles = StyleSheet.create({
  outsideModal: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  modal: {
    height: "95%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    flex: 1,
    marginRight: 6,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
  continueContainer: {
    position: "absolute",
    width: "100%",
    height: "10%",
    bottom: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  continueButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: "30%",
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  cancelText: {
    fontSize: 16,
  },
});
