import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NewAmenity } from "../../../models/amenity.model";
import { addNewAmenity } from "../../../api/amenity.api";

type Props = {
  onCloseModal: (state: boolean) => void;
};

export default function AddAmenityModal({ onCloseModal }: Props) {
  const [name, setName] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleConfirm = async () => {
    if (name == "") {
      Alert.alert("Thông báo", "Thiếu trường name");
      return;
    };
    if (iconPath == "") {
      Alert.alert("Thông báo", "Thiếu trường icon");
      return;
    };
    if (category == "") {
      Alert.alert("Thông báo", "Thiếu trường category");
      return;
    };

    const newAmenity: NewAmenity = {
      name: name,
      icon_path: iconPath,
      description: description,
      category: category,
    };

    await addNewAmenity(newAmenity);
    Alert.alert("Thông báo", "Đã lưu Amenity thành công");
    onCloseModal(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.modal}>
        <Ionicons
          style={styles.closeButton}
          name="close"
          size={24}
          color="black"
          onPress={() => onCloseModal(false)}
        />

        <Text style={styles.title}>Nhập thông tin của Amenity</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Icon</Text>

          <TextInput
            style={styles.input}
            value={iconPath}
            onChangeText={setIconPath}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>

          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>

          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleConfirm()}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
    padding: 40,
    paddingVertical: 100,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  confirmButton: {
    backgroundColor: "black",
    borderRadius: 20,
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
