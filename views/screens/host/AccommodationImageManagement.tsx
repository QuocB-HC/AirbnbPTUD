import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AccommodationImage } from "../../../models/accommodation.model";
import { getImageByAccommodationId } from "../../../api/images.api";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import AddImageModal from "../../modals/HostModal/AddImageModal";

type Props = {
  navigation: any;
  route: any;
};

export default function AccommodationImageManagement({
  navigation,
  route,
}: Props) {
  const accommodationId = route.params.id;
  const [images, setImages] = useState<AccommodationImage[]>([]);
  const [newImage, setNewImage] = useState("");
  const [isOpenAddImageModal, setIsOpenAddImageModal] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: "images",
    });

    if (!result.canceled) {
      const file = result.assets[0];
      setNewImage(file.uri);
    }
  };

  const handleAddImage = async () => {};

  useEffect(() => {
    const getImage = async () => {
      const result = await getImageByAccommodationId(accommodationId);

      setImages(result);
    };

    getImage();
  });

  // Ẩn tab khi vào trang detail
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

    // Khi rời màn hình thì hiện lại
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.goBackIcon}
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsOpenAddImageModal(true)}
      >
        <AntDesign name="plus" size={20} color="black" />
      </TouchableOpacity>

      <ScrollView style={styles.imageContainer}>
        <View style={{ gap: 10, flexDirection: "row", flexWrap: "wrap" }}>
          {images.map((image) => (
            <View style={styles.image} key={image.id}>
              <Image
                style={{ width: "100%", height: "80%" }}
                source={{ uri: image.image_url }}
              />

              <MaterialCommunityIcons
                name="close-circle"
                size={24}
                color="red"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal animationType="slide" visible={isOpenAddImageModal}>
        <AddImageModal
          accommodationId={accommodationId}
          onCloseModal={() => setIsOpenAddImageModal(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  goBackIcon: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  imageContainer: {
    height: "80%",
    marginTop: "20%",
  },
  image: {
    height: 150,
    width: "30%",
    alignItems: "center",
    gap: 5,
  },
});
