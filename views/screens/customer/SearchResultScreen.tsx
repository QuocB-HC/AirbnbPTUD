import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CityWithProvinceName } from "../../../models/city.model";
import { useRoute } from "@react-navigation/native";
import { DateRange } from "../../../models/date.model";
import { Customer } from "../../../models/customer.model";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SearchModal from "../../modals/SearchModals/SearchModal";
import { Accommodation } from "../../../models/accommodation.model";
import { getAccommodationByCityId } from "../../../api/accommodation.api";
import AccommodationCard from "../../components/AccommodationCard";
import { useDispatch } from "react-redux";
import EditCustomer from "../../../redux/actions/EditCustomer";
import { EditDate, EditNights, EditRange } from "../../../redux/actions/EditDate";

export default function SearchResultScreen({ navigation }: any) {
  const route = useRoute();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const { place, date, customer } = route.params as {
    place: CityWithProvinceName;
    date: DateRange;
    customer: Customer;
  };
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const formatDateRange = (rangeDate: DateRange) => {
    if (!rangeDate || !rangeDate.checkInDate || !rangeDate.checkOutDate) {
      return "Any week";
    } else {
      const start = new Date(rangeDate.checkInDate);
      const end = new Date(rangeDate.checkOutDate);

      // lấy ngày và tháng
      const startDay = start.getDate();
      const endDay = end.getDate();
      const month = start.getMonth() + 1; // tháng trong JS bắt đầu từ 0

      // Nếu cùng tháng
      if (start.getMonth() === end.getMonth()) {
        return `${startDay} - ${endDay} thg ${month}`;
      }

      // Nếu khác tháng
      return `${startDay} thg ${start.getMonth() + 1} - ${endDay} thg ${
        end.getMonth() + 1
      }`;
    }
  };

  const goBack = () => {
    navigation.goBack();
    dispatch(EditDate({ checkInDate: null, checkOutDate: null }));
    dispatch(EditRange(null));
    dispatch(EditNights(0));
    dispatch(EditCustomer({ adult: 0, child: 0, baby: 0 }));
  };

  useEffect(() => {
    const load = async () => {
      const result = await getAccommodationByCityId(place.id);

      setAccommodations(result);
    };

    load();
  }, []);

  if (accommodations.length == 0) {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "white" }}>
        <SafeAreaView>
          <View style={styles.header}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="#000"
              style={styles.searchIcon}
              onPress={() => goBack()}
            />

            <TouchableOpacity
              style={styles.searchContainer}
              onPress={() => setIsOpenSearchModal(true)}
            >
              {/* Text content */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>Chỗ ở tại {place.name}</Text>
                <Text style={styles.subText}>
                  {formatDateRange(date)} ·{" "}
                  {customer.adult + customer.child + customer.baby > 1 ? (
                    <Text>
                      {customer.adult + customer.child + customer.baby} khách
                    </Text>
                  ) : (
                    <Text>Thêm khách</Text>
                  )}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Icon filter */}
            <View style={styles.filterButton}>
              <Ionicons name="options-outline" size={25} color="#000" />
            </View>
          </View>
          <View
            style={{
              height: "85%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Không tìm thấy chỗ ở nào
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView>
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="#000"
            style={styles.searchIcon}
            onPress={() => navigation.goBack()}
          />

          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => setIsOpenSearchModal(true)}
          >
            {/* Text content */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Chỗ ở tại {place.name}</Text>
              <Text style={styles.subText}>
                {formatDateRange(date)} ·{" "}
                {customer.adult + customer.child + customer.baby > 1 ? (
                  <Text>
                    {customer.adult + customer.child + customer.baby} khách
                  </Text>
                ) : (
                  <Text>Thêm khách</Text>
                )}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Icon filter */}
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={25} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.container}
          data={accommodations}
          keyExtractor={(accommodations) => accommodations.id.toString()}
          renderItem={({ item }) => (
            <AccommodationCard accommodation={item} navigation={navigation} />
          )}
        />

        <Modal
          visible={isOpenSearchModal}
          transparent={true}
          animationType="fade"
        >
          <SearchModal
            onCloseModal={() => setIsOpenSearchModal(false)}
            navigation={navigation}
          />
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  searchContainer: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 15,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    margin: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  subText: {
    color: "gray",
    fontSize: 12,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  container: {
    height: "85%",
    padding: 20,
  },
});
