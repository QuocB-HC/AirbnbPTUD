import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { NewBooking } from "../models/booking.model";

export const createBooking = async (bookingData: NewBooking) => {
  try {
    const { data, error } = await supabase
      .from("booking")
      .insert([
        {
          guest_id: bookingData.guest_id,
          accommodation_id: bookingData.accommodation_id,
          check_in_date: bookingData.check_in_date,
          check_out_date: bookingData.check_out_date,
          total_price: bookingData.total_price,
          status: bookingData.status || "Pending",
        },
      ])
      .select();

    if (error) {
      console.error("Error creating booking:", error);
      Alert.alert("Booking failed", error.message);
      return null;
    }

    console.log("Booking created:", data);
    return data[0];
  } catch (err) {
    console.error("Unexpected error:", err);
    Alert.alert("Booking failed", "Something went wrong");
    return null;
  }
};
