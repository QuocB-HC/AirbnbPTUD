import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  Accommodation,
  AccommodationImage,
} from "../../../models/accommodation.model";
import BookingMultiCalendar from "../../components/BookingMultiCalendar";
import ChangeCustomerModal from "./ChangeCustomerModal";
import SeePriceDetailModal from "./SeePriceDetailModal";

type BookingDetailProps = {
  accommodation: Accommodation;
  image: AccommodationImage;
  totalRating: number;
  totalReview: number;
  totalPrice: number;
  onCloseModal: (state: boolean) => void;
  onContinue: (state: boolean) => void;
};

const BookingDetail = ({
  accommodation,
  image,
  totalRating,
  totalReview,
  totalPrice,
  onCloseModal,
  onContinue,
}: BookingDetailProps) => {
  const rangeState = useSelector((state: any) => state.DateReducer.range);
  const customerState = useSelector((state: any) => state.customer.customer);
  const [isOpenChangeDateModal, setIsOpenChangeDateModal] = useState(false);
  const [isOpenChangeCustomerModal, setIsOpenChangeCustomerModal] =
    useState(false);
  const [isOpenPriceDetailModal, setIsOpenPriceDetailModal] = useState(false);

  const getCurrentYear = (): number => new Date().getFullYear();

  return (
    <View style={styles.modal}>
      <Ionicons
        style={styles.closeButton}
        name="close"
        size={24}
        color="black"
        onPress={() => onCloseModal(false)}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Kiểm tra lại và tiếp tục</Text>

        <View style={styles.details}>
          <View style={styles.roomCard}>
            <Image source={{ uri: image.image_url }} style={styles.roomImage} />
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{accommodation.name}</Text>
              <Text style={styles.rating}>
                {totalRating} ({totalReview}) • Được khách yêu thích
              </Text>
            </View>
          </View>

          {/* Ngày */}
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}>Ngày</Text>
              <Text style={styles.value}>
                {rangeState}, {getCurrentYear()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => setIsOpenChangeDateModal(true)}
            >
              <Text style={styles.changeText}>Thay đổi</Text>
            </TouchableOpacity>
          </View>

          {/* Khách */}
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}>Khách</Text>
              <Text style={styles.value}>
                {customerState.adult > 0 ? (
                  <Text>
                    {customerState.adult} người lớn{" "}
                    {customerState.child > 0 && (
                      <Text>
                        ,{customerState.child} trẻ em{" "}
                        {customerState.baby > 0 && (
                          <Text>,{customerState.baby} em bé</Text>
                        )}
                      </Text>
                    )}
                  </Text>
                ) : null}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => setIsOpenChangeCustomerModal(true)}
            >
              <Text style={styles.changeText}>Thay đổi</Text>
            </TouchableOpacity>
          </View>

          {/* Tổng giá */}
          <View style={styles.detailRow}>
            <View style={styles.detail}>
              <Text style={styles.label}>Tổng giá</Text>
              <Text style={styles.value}>
                đ{totalPrice.toLocaleString()} VND
              </Text>
            </View>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => setIsOpenPriceDetailModal(true)}
            >
              <Text style={styles.detailText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.note}>
              Đã phòng/đặt chỗ ngay không được hoàn tiền.
            </Text>
            <Text style={styles.note}>
              Toàn bộ chi phí sẽ được tính khi nhận phòng.
            </Text>
          </View>
        </View>
      </View>

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
          <View
            style={{ flex: 1, backgroundColor: "lightgray", height: 3 }}
          ></View>
          <View
            style={{ flex: 1, backgroundColor: "lightgray", height: 3 }}
          ></View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => onContinue(true)}
        >
          <Text style={styles.continueText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>

      {/* Change date modal */}
      <Modal animationType="slide" visible={isOpenChangeDateModal}>
        <View style={styles.outsideModal}>
          <View style={styles.bookingCalendarModal}>
            <Ionicons
              style={styles.closeButton}
              name="close"
              size={24}
              color="black"
              onPress={() => setIsOpenChangeDateModal(false)}
            />

            <View style={{ height: "100%" }}>
              <BookingMultiCalendar />
            </View>
          </View>
        </View>
      </Modal>

      {/* Change customer modal */}
      <Modal animationType="slide" visible={isOpenChangeCustomerModal}>
        <ChangeCustomerModal
          limit={accommodation.max_guest}
          onCloseModal={() => setIsOpenChangeCustomerModal(false)}
        />
      </Modal>

      {/* See price modal */}
      <Modal animationType="slide" visible={isOpenPriceDetailModal}>
        <SeePriceDetailModal
          price={accommodation.price_per_night}
          onCloseModal={(state: any) => setIsOpenPriceDetailModal(state)}
        />
      </Modal>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
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
  roomCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  roomImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  roomInfo: {
    marginLeft: 12,
  },
  roomName: {
    fontSize: 16,
    fontWeight: "500",
    width: "90%",
  },
  rating: {
    fontSize: 14,
    color: "#666",
  },
  details: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
    height: 70,
  },
  detail: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  changeButton: {
    padding: 4,
  },
  changeText: {
    color: "#1E90FF",
    fontSize: 14,
  },
  detailButton: {
    padding: 4,
  },
  detailText: {
    color: "#1E90FF",
    fontSize: 14,
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
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
  outsideModal: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  bookingCalendarModal: {
    height: "95%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "flex-end",
  },
});
