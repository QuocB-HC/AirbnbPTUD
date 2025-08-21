import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Accommodation } from "../../../models/accommodation.model";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../services/authService";
import { NewBooking } from "../../../models/booking.model";
import { createBooking } from "../../../api/booking.api";
import {
  EditDate,
  EditNights,
  EditRange,
} from "../../../redux/actions/EditDate";

type Props = {
  accommodation: Accommodation;
  totalPrice: number;
  onCloseModal: (state: boolean) => void;
};

const ConfirmPayment = ({ accommodation, totalPrice, onCloseModal }: Props) => {
  const currentDate = new Date();
  const dateState = useSelector((state: any) => state.DateReducer.date);
  const [newBooking, setNewBooking] = useState<NewBooking>({
    guest_id: "",
    accommodation_id: "",
    check_in_date: "",
    check_out_date: "",
    total_price: 0,
    status: "",
  });
  const dispatch = useDispatch();

  const formattedTime = currentDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate = currentDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleConfirm = async () => {
    try {
      const result = await createBooking(newBooking);
      console.log("Booking success:", result);
      dispatch(EditDate({ checkInDate: null, checkOutDate: null }));
      dispatch(EditRange(null));
      dispatch(EditNights(0));
      onCloseModal(false);
    } catch (error: any) {
      console.error("Booking failed:", error.message);
    }
  };

  useEffect(() => {
    const setBooking = async () => {
      const user_id = await getUserId();

      if (user_id) {
        const booking: NewBooking = {
          guest_id: user_id,
          accommodation_id: accommodation.id,
          check_in_date: dateState.checkInDate,
          check_out_date: dateState.checkOutDate,
          total_price: totalPrice,
          status: "Confirmed",
        };

        setNewBooking(booking);
      }
    };

    setBooking();
  }, []);

  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.title}>Xác nhận thanh toán</Text>

        <View style={styles.confirmationCard}>
          <Text style={styles.confirmationText}>
            Thanh toán cho {accommodation.name} đã hoàn tất!
          </Text>
          <Text style={styles.detailText}>
            Tổng số tiền: đ{totalPrice.toLocaleString()} VND
          </Text>
          <Text style={styles.detailText}>
            Thời gian: {formattedTime} - {formattedDate}
          </Text>
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
          <View style={{ flex: 1, backgroundColor: "black", height: 3 }}></View>
          <View style={{ flex: 1, backgroundColor: "black", height: 3 }}></View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => handleConfirm()}
        >
          <Text style={styles.continueText}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 100,
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  confirmationCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  confirmationText: {
    fontSize: 16,
    color: "#2ecc71",
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
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
});
