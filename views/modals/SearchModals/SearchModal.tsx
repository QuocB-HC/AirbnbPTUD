import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getAllCity } from "../../../api/city.api";
import { CityWithProvinceName } from "../../../models/city.model";
import { getProvinceById } from "../../../api/province.api";
import BookingMultiCalendar from "../../components/BookingMultiCalendar";
import { DateRange } from "../../../models/date.model";
import { Customer } from "../../../models/customer.model";
import { addHistory, getHistoryCitiesByUserId } from "../../../api/history.api";
import { getCurrentUser } from "../../../services/authService";

type Props = {
  onCloseModal: (state: boolean) => void;
  navigation: any;
};

export default function SearchModal({ onCloseModal, navigation }: Props) {
  const [cities, setCities] = useState<CityWithProvinceName[]>([]);
  const [top20Cities, setTop20Cities] = useState<CityWithProvinceName[]>([]);
  const [filteredCity, setFilteredCity] = useState<CityWithProvinceName[]>([]);
  const [historyCity, setHistoryCity] = useState<CityWithProvinceName[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showPlace, setShowPlace] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showCustomer, setShowCustomer] = useState<boolean>(false);

  const [place, setPlace] = useState<CityWithProvinceName>({
    id: 0,
    name: "",
    province_id: 0,
    popularity: 0,
    provinceName: "",
  });
  const [date, setDate] = useState<{
    checkInDate: string | null;
    checkOutDate: string | null;
  }>({
    checkInDate: null,
    checkOutDate: null,
  });
  const [customer, setCustomer] = useState<Customer>({
    adult: 0,
    child: 0,
    baby: 0,
  });

  const handleShowPlace = () => {
    setShowPlace(true);
    setShowDate(false);
    setShowCustomer(false);
  };

  const handleShowDate = () => {
    setShowPlace(false);
    setShowDate(true);
    setShowCustomer(false);
  };

  const handleShowCustomer = () => {
    setShowPlace(false);
    setShowDate(false);
    setShowCustomer(true);
  };

  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD") // tách dấu khỏi ký tự
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const keyword = removeVietnameseTones(text.trim().toLowerCase());

    if (keyword === "") {
      setFilteredCity([]);
    } else {
      const results = cities.filter((city) => {
        const cityName = removeVietnameseTones(city.name.toLowerCase());
        const provinceName = removeVietnameseTones(
          city.provinceName.toLowerCase()
        );

        return cityName.includes(keyword) || provinceName.includes(keyword);
      });
      setFilteredCity(results);
    }
  };

  const getTopCitiesByPopularity = (
    cities: CityWithProvinceName[],
    limit: number
  ): CityWithProvinceName[] => {
    return [...cities] // sao chép để không làm thay đổi mảng gốc
      .sort((a, b) => b.popularity - a.popularity) // sắp xếp giảm dần theo popularity
      .slice(0, limit); // lấy n phần tử đầu tiên
  };

  const handleSelectPlace = (city: CityWithProvinceName) => {
    setPlace(city);
    setShowPlace(false);
    setShowDate(true);
    setShowCustomer(false);
    setSearchQuery("");
    setFilteredCity([]);
  };

  const handleSelectDate = (dateRange: DateRange) => {
    setDate(dateRange);
    setShowPlace(false);
    setShowDate(false);
    setShowCustomer(true);
  };

  const handleDecrease = (key: keyof Customer) => {
    setCustomer((prev) => ({
      ...prev,
      [key]: prev[key] > 0 ? prev[key] - 1 : 0,
    }));
  };

  const handleIncrease = (key: keyof Customer) => {
    setCustomer((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  const resetState = () => {
    setPlace({
      id: 0,
      name: "",
      province_id: 0,
      popularity: 0,
      provinceName: "",
    });
    setDate({ checkInDate: null, checkOutDate: null });
    setCustomer({ adult: 0, child: 0, baby: 0 });
    setSearchQuery("");
  };

  const handleConfirmSearch = async () => {
    if (place.id > 0 && date.checkInDate && date.checkOutDate) {
      const userId = getCurrentUser().id;
      await addHistory(userId, place.id);
      navigation.push("Search Result", {
        place: place,
        date: date,
        customer: customer,
        navigation: navigation,
      });
      onCloseModal(false);
    } else {
      alert("Vui lòng chọn địa điểm, thời gian và khách.");
    }
  };

  useEffect(() => {
    handleShowPlace();

    (async () => {
      try {
        const cities = await getAllCity();

        const citiesWithProvinceName: CityWithProvinceName[] =
          await Promise.all(
            cities.map(async (city) => {
              const province = await getProvinceById(city.province_id);
              return {
                ...city,
                provinceName: province ? province.name : "Unknown Province",
              };
            })
          );

        setCities(citiesWithProvinceName);

        const top20Cities = getTopCitiesByPopularity(
          citiesWithProvinceName,
          20
        );
        setTop20Cities(top20Cities);

        const currentUser = getCurrentUser();

        if (!currentUser) {
          console.error("Người dùng chưa đăng nhập");
          return;
        }

        const userId = currentUser.id;
        const citiesHistory: CityWithProvinceName[] = await Promise.all(
          (
            await getHistoryCitiesByUserId(userId)
          ).map(async (city) => {
            const province = await getProvinceById(city.province_id);
            return {
              ...city,
              provinceName: province ? province.name : "Unknown Province",
            };
          })
        );
        setHistoryCity(citiesHistory);
      } catch (error) {
        console.error("Error fetching cities with province name:", error);
      }
    })();
  }, []);

  return (
    <View style={styles.outsideModal}>
      <View style={styles.header}>
        <Ionicons
          style={styles.closeButton}
          name="close"
          size={24}
          color="black"
          onPress={() => onCloseModal(false)}
        />
      </View>

      {/* Chọn địa điểm */}
      {showPlace == false ? (
        <Pressable
          style={styles.defaultModal}
          onPress={() => handleShowPlace()}
        >
          <Text style={styles.leftText}>Địa điểm</Text>
          {place.id > 0 ? (
            <Text style={styles.rightText}>
              {place.name}, {place.provinceName}
            </Text>
          ) : (
            <Text style={styles.rightText}>Tìm kiếm linh hoạt</Text>
          )}
        </Pressable>
      ) : (
        <View style={styles.placeModal}>
          <Text style={styles.modalTitle}>Địa điểm</Text>
          <View style={styles.placeSearchInputContainer}>
            <Ionicons
              style={styles.placeSearchIcon}
              name="search"
              size={20}
              color="black"
            />
            <TextInput
              style={styles.placeSearchInput}
              placeholder="Tìm kiếm điểm đến"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <ScrollView
            style={styles.placeListContainer}
            showsVerticalScrollIndicator={false}
          >
            {searchQuery != "" ? (
              <View>
                <Text style={styles.rightText}>Kết quả tìm kiếm</Text>
                {filteredCity.map((city) => (
                  <TouchableOpacity
                    key={city.id}
                    style={styles.placeListItem}
                    onPress={() => handleSelectPlace(city)}
                  >
                    <Image
                      source={require("../../../assets/images/place-icon.png")}
                      style={styles.placeListItemIcon}
                    />
                    <View>
                      <Text style={styles.placeListItemText}>{city.name}</Text>
                      <Text style={styles.placeListItemText}>
                        {city.provinceName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={{ gap: 20 }}>
                <Text style={styles.rightText}>Những tìm kiếm gần đây</Text>
                {historyCity.length == 0 ? null : (
                  <View>
                    {historyCity.map((city) => (
                      <TouchableOpacity
                        key={city.id}
                        style={styles.placeListItem}
                        onPress={() => handleSelectPlace(city)}
                      >
                        <Image
                          source={require("../../../assets/images/place-icon.png")}
                          style={styles.placeListItemIcon}
                        />
                        <View>
                          <Text style={styles.placeListItemText}>
                            {city.name}
                          </Text>
                          <Text style={styles.placeListItemText}>
                            {city.provinceName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <Text style={styles.rightText}>Điểm đến được đề xuất</Text>
                {top20Cities.map((city) => (
                  <TouchableOpacity
                    key={city.id}
                    style={styles.placeListItem}
                    onPress={() => handleSelectPlace(city)}
                  >
                    <Image
                      source={require("../../../assets/images/place-icon.png")}
                      style={styles.placeListItemIcon}
                    />
                    <View>
                      <Text style={styles.placeListItemText}>{city.name}</Text>
                      <Text style={styles.placeListItemText}>
                        {city.provinceName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      )}

      {/* Chọn thời gian */}
      {showDate == false ? (
        <Pressable style={styles.defaultModal} onPress={() => handleShowDate()}>
          <Text style={styles.leftText}>Thời gian</Text>
          {date.checkInDate && date.checkOutDate ? (
            <Text style={styles.rightText}>
              {new Date(date.checkInDate).toLocaleDateString()} -{" "}
              {new Date(date.checkOutDate).toLocaleDateString()}
            </Text>
          ) : (
            <Text style={styles.rightText}>Thêm ngày</Text>
          )}
        </Pressable>
      ) : (
        <View style={styles.dateModal}>
          <Text style={styles.modalTitle}>Thời gian</Text>
          <View style={{ height: "90%" }}>
            <BookingMultiCalendar
              onChangDate={(range) => handleSelectDate(range)}
            />
          </View>
        </View>
      )}

      {/* Chọn khách */}
      {showCustomer == false ? (
        <Pressable
          style={styles.defaultModal}
          onPress={() => handleShowCustomer()}
        >
          <Text style={styles.leftText}>Khách</Text>
          {customer.adult > 0 || customer.child > 0 || customer.baby > 0 ? (
            <Text style={styles.rightText}>
              {customer.adult + customer.child} khách, {customer.baby} em bé
            </Text>
          ) : (
            <Text style={styles.rightText}>Thêm khách</Text>
          )}
        </Pressable>
      ) : (
        <View style={styles.customerModal}>
          <Text style={styles.modalTitle}>Khách</Text>

          <View style={styles.customerItemContainer}>
            <View>
              <Text style={styles.customerItemTitle}>Người lớn</Text>
              <Text style={styles.customerItemSubtitle}>
                Từ 13 tuổi trở lên
              </Text>
            </View>
            <View style={styles.customerItemLeft}>
              {customer.adult === 0 ? null : (
                <Pressable
                  style={styles.customerItemDecreaseButtonContainer}
                  onPress={() => handleDecrease("adult")}
                >
                  <Text style={styles.customerItemDecreaseButton}>-</Text>
                </Pressable>
              )}

              <Text style={styles.customerItemNumber}>{customer.adult}</Text>
              <Pressable
                style={styles.customerItemIncreaseButtonContainer}
                onPress={() => handleIncrease("adult")}
              >
                <Text style={styles.customerItemIncreaseButton}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.customerItemContainer}>
            <View>
              <Text style={styles.customerItemTitle}>Trẻ em</Text>
              <Text style={styles.customerItemSubtitle}>Độ tuổi 2 - 12</Text>
            </View>
            <View style={styles.customerItemLeft}>
              {customer.child === 0 ? null : (
                <Pressable
                  style={styles.customerItemDecreaseButtonContainer}
                  onPress={() => handleDecrease("child")}
                >
                  <Text style={styles.customerItemDecreaseButton}>-</Text>
                </Pressable>
              )}

              <Text style={styles.customerItemNumber}>{customer.child}</Text>
              <Pressable
                style={styles.customerItemIncreaseButtonContainer}
                onPress={() => handleIncrease("child")}
              >
                <Text style={styles.customerItemIncreaseButton}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.customerItemContainer}>
            <View>
              <Text style={styles.customerItemTitle}>Em bé</Text>
              <Text style={styles.customerItemSubtitle}>Dưới 2 tuổi</Text>
            </View>
            <View style={styles.customerItemLeft}>
              {customer.baby === 0 ? null : (
                <Pressable
                  style={styles.customerItemDecreaseButtonContainer}
                  onPress={() => handleDecrease("baby")}
                >
                  <Text style={styles.customerItemDecreaseButton}>-</Text>
                </Pressable>
              )}

              <Text style={styles.customerItemNumber}>{customer.baby}</Text>
              <Pressable
                style={styles.customerItemIncreaseButtonContainer}
                onPress={() => handleIncrease("baby")}
              >
                <Text style={styles.customerItemIncreaseButton}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <View style={styles.confirmSearchContainer}>
        <Pressable onPress={() => resetState()}>
          <Text style={styles.deleteButton}>Xóa tất cả</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleConfirmSearch()}
        >
          <Ionicons
            style={styles.placeSearchIcon}
            name="search"
            size={20}
            color="white"
          />
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outsideModal: {
    flex: 1,
    backgroundColor: "rgba(152, 152, 152, 0.9)",
  },
  header: {
    height: "15%",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
  },
  defaultModal: {
    backgroundColor: "white",
    marginHorizontal: 10,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rightText: {
    fontWeight: "bold",
  },
  leftText: {
    color: "gray",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  // Modal for selecting place
  placeModal: {
    backgroundColor: "white",
    height: "62%",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  placeSearchInputContainer: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  placeSearchIcon: {
    padding: 10,
  },
  placeSearchInput: {
    width: "100%",
  },
  placeListContainer: {
    overflow: "hidden",
    maxHeight: "70%",
  },
  placeListItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  placeListItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 15, // Assuming the icon is circular
    resizeMode: "cover", // Adjust as needed
  },
  placeListItemText: {
    fontSize: 16,
    color: "black",
  },

  // Modal for selecting date
  dateModal: {
    backgroundColor: "white",
    height: "62%",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  // Modal for selecting customer
  customerModal: {
    backgroundColor: "white",
    height: "auto",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 40,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  customerItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingVertical: 20,
  },
  customerItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customerItemSubtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  customerItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  customerItemDecreaseButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  customerItemDecreaseButton: {
    fontSize: 16,
  },
  customerItemNumber: {
    fontSize: 16,
  },
  customerItemIncreaseButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  customerItemIncreaseButton: {
    fontSize: 16,
  },

  // Confirm search button
  confirmSearchContainer: {
    height: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
  },
  deleteButton: {
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#f7194dff",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
