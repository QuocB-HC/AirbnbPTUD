import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Accommodation,
  AccommodationImage,
} from "../../../models/accommodation.model";
import BookingDetail from "./BookingDetail";
import PaymentDetail from "./PaymentDetail";
import ConfirmPayment from "./ConfirmPayment";

type BookingModalProps = {
  accommodation: Accommodation;
  image: AccommodationImage;
  totalRating: number;
  totalReview: number;
  totalPrice: number;
  onCloseModal: (state: boolean) => void;
};

const BookingModal = ({
  accommodation,
  image,
  totalRating,
  totalReview,
  totalPrice,
  onCloseModal,
}: BookingModalProps) => {
  const [isOpenBookingDetail, setIsOpenBookingDetail] = useState(false);
  const [isOpenPaymentDetail, setIsOpenPaymentDetail] = useState(false);
  const [isOpenConfirmPayment, setIsOpenConfirmPayment] = useState(false);

  const step1 = () => {
    setIsOpenBookingDetail(true);
    setIsOpenPaymentDetail(false);
    setIsOpenConfirmPayment(false);
  };

  const step2 = () => {
    setIsOpenBookingDetail(false);
    setIsOpenPaymentDetail(true);
    setIsOpenConfirmPayment(false);
  };

  const step3 = () => {
    setIsOpenBookingDetail(false);
    setIsOpenPaymentDetail(false);
    setIsOpenConfirmPayment(true);
  };

  useEffect(() => {
    step1();
  }, []);

  return (
    <View style={styles.modal}>
      {isOpenBookingDetail ? (
        <BookingDetail
          accommodation={accommodation}
          image={image}
          totalRating={totalRating}
          totalReview={totalReview}
          totalPrice={totalPrice}
          onCloseModal={() => onCloseModal(false)}
          onContinue={() => step2()}
        />
      ) : null}

      {isOpenPaymentDetail ? (
        <PaymentDetail
          onCloseModal={() => onCloseModal(false)}
          onPrevious={() => step1()}
          onContinue={() => step3()}
        />
      ) : null}

      {isOpenConfirmPayment ? (
        <ConfirmPayment
          accommodation={accommodation}
          totalPrice={totalPrice}
          onCloseModal={() => onCloseModal(false)}
        />
      ) : null}
    </View>
  );
};

export default BookingModal;

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
});
