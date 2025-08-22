import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { HostAccommodationStackParamList } from "../../../navigation/HostAccommodationNavigation";
import { City, CityWithProvinceName } from "../../../models/city.model";
import { getCityById } from "../../../api/city.api";
import { getProvinceById } from "../../../api/province.api";
import { Province } from "../../../models/province.model";
import MapModal from "../../modals/HostModal/MapModal";
import Ionicons from "@expo/vector-icons/Ionicons";

type AccommodationDetailRouteProp = RouteProp<
  HostAccommodationStackParamList,
  "Accommodation Detail"
>;

type Props = {
  navigation: any;
  route: AccommodationDetailRouteProp;
};

export default function AccommodationDetailManagement({
  navigation,
  route,
}: Props) {
  const accommodation = route.params.accommodation;
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [isOpenMapModal, setIsOpenMapModal] = useState(false);

  useEffect(() => {
    const getCityAndProvince = async () => {
      const city: City = await getCityById(accommodation.city);
      const province: Province = await getProvinceById(city.province_id);

      setCity(city.name);
      setProvince(province.name);
    };

    getCityAndProvince();
  });

  // Ẩn tab khi vào trang detail
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

    // Khi rời màn hình thì hiện lại
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons
          style={styles.goBackIcon}
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.title}>{accommodation.name}</Text>
        <Text style={styles.subTitle}>{accommodation.property_type}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Giá mỗi đêm:</Text>
          <Text style={styles.value}>
            {accommodation.price_per_night.toLocaleString()} đ
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.value}>
            {city}, {province}, {accommodation.country}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Map:</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.value}>
                Kinh độ: {accommodation.longitude}
              </Text>
              <Text style={styles.value}>Vĩ độ: {accommodation.latitude}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsOpenMapModal(true)}>
              <Text
                style={{ color: "#63C8FF", textDecorationLine: "underline" }}
              >
                Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Mô tả:</Text>
          <Text style={styles.value}>{accommodation.description}</Text>
        </View>
      </ScrollView>

      <Modal animationType="slide" visible={isOpenMapModal}>
        <MapModal
          accommodation={accommodation}
          onCloseModal={() => setIsOpenMapModal(false)}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  goBackIcon: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imageText: {
    color: "#666",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 12,
  },
  infoBox: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#444",
  },
  value: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});
