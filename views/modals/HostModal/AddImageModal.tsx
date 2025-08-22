import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { UploadImage } from "../../../services/storageService";
import { addImage } from "../../../api/images.api";
import { NewAccommodationImage } from "../../../models/accommodation.model";

type Props = {
  accommodationId: string;
  onCloseModal: (state: boolean) => void;
};

export default function AddImageModal({
  accommodationId,
  onCloseModal,
}: Props) {
  const [image, setImage] = useState<any>(null);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: "images",
    });

    if (!result.canceled) {
      const file = result.assets[0];
      setImage(file);      
    }
  };

  const handleUploadImage = async () => {    
    const newImageUrl = await UploadImage(
      accommodationId,
      image,
      "accommodation_images"
    );

    console.log(newImageUrl);

    if (newImageUrl) {
      const newImage: NewAccommodationImage = {
        accommodation_id: accommodationId,
        image_url: newImageUrl,
      };
      const result = await addImage(newImage);
      console.log(result);
    }
  };

  return (
    <View style={styles.modal}>
      <Ionicons
        style={styles.closeIcon}
        name="close"
        size={24}
        color="black"
        onPress={() => onCloseModal(false)}
      />

      <View style={{ height: "20%" }} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.imagePicker} onPress={openGallery}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Entypo name="folder-images" size={40} color="#aaa" />
              <Text style={{ color: "#aaa", marginTop: 5 }}>
                Chọn ảnh khóa học
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleUploadImage()}
        >
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  container: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  imagePicker: {
    width: "100%",
    height: 500,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  imagePlaceholder: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: "#FF385C",
    height: 50,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  uploadText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
