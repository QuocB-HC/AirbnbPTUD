import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import EditDate from "../../redux/actions/EditDate";

export default function BookingSingleCalendar({ city, onDatesChange }: any) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const dispatch = useDispatch();
  const dateState = useSelector((state: any) => state.DateReducer.date);

  useEffect(() => {
    if (dateState) {
      setStartDate(dateState.checkInDate);
      setEndDate(dateState.checkOutDate);
    }
  }, [dateState]);

  LocaleConfig.locales["vi"] = {
    monthNames: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    monthNamesShort: [
      "Thg 1",
      "Thg 2",
      "Thg 3",
      "Thg 4",
      "Thg 5",
      "Thg 6",
      "Thg 7",
      "Thg 8",
      "Thg 9",
      "Thg 10",
      "Thg 11",
      "Thg 12",
    ],
    dayNames: [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ],
    dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    today: "Hôm nay",
  };
  LocaleConfig.defaultLocale = "vi";

  const onDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      onDatesChange(null, 0); // chưa chọn đủ 2 ngày
    } else {
      if (new Date(day.dateString) > new Date(startDate)) {
        const newEnd = day.dateString;
        setEndDate(newEnd);

        const rangeText = formatRange(startDate, newEnd);
        const totalNights = calcNights(startDate, newEnd);
        const newDate = { checkInDate: startDate, checkOutDate: newEnd };
        dispatch(EditDate(newDate));

        // gửi cả chuỗi range và số nights
        onDatesChange(rangeText, totalNights);
      } else {
        setStartDate(day.dateString);
        setEndDate(null);
        onDatesChange(null, 0);
      }
    }
  };

  const calcNights = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startD = new Date(start);
    const endD = new Date(end);
    return Math.ceil(
      (endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const getMarkedDates = () => {
    let marked: any = {};

    if (startDate) {
      marked[startDate] = {
        startingDay: true,
        color: "#000",
        textColor: "#fff",
      };
    }

    if (endDate) {
      marked[endDate] = {
        endingDay: true,
        color: "#000",
        textColor: "#fff",
      };

      let current = new Date(startDate!);

      while (current < new Date(endDate)) {
        current.setDate(current.getDate() + 1);
        let dateString = current.toISOString().split("T")[0];
        if (dateString !== endDate) {
          marked[dateString] = { color: "#ccc", textColor: "#000" };
        }
      }
    }

    return marked;
  };

  const formatRange = (start: any, end: any) => {
    if (!start || !end) return null;

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    const startDay = startDateObj.getDate();
    const endDay = endDateObj.getDate();

    const month = startDateObj.getMonth() + 1; // JS month bắt đầu từ 0

    return `${startDay} - ${endDay} thg ${month}`;
  };

  const nights = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Hàm định dạng ngày tiếng Việt
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    onDatesChange(null, null);
    dispatch(
      EditDate({
        checkInDate: null,
        checkOutDate: null,
      })
    );
  };

  return (
    <View style={styles.container}>
      {city != "" ? (
        <View style={styles.textContainer}>
          {startDate && endDate ? (
            <>
              <Text style={styles.title}>
                {nights()} đêm tại Thành phố {city}
              </Text>
              <Text style={styles.subtitle}>
                {formatDate(startDate)} - {formatDate(endDate)}
              </Text>
            </>
          ) : !startDate ? (
            <>
              <Text style={styles.title}>Chọn ngày nhận phòng</Text>
              <Text style={styles.subtitle}>
                Thêm ngày đi để biết giá chính xác
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>Chọn ngày trả phòng</Text>
              <Text style={styles.subtitle}>
                Thêm ngày trả để biết giá chính xác
              </Text>
            </>
          )}
        </View>
      ) : null}

      <Calendar
        markingType={"period"}
        markedDates={getMarkedDates()}
        onDayPress={onDayPress}
        minDate={new Date().toISOString().split("T")[0]}
      />

      {city != "" ? (
        <Pressable style={styles.deleteBtn} onPress={() => resetDates()}>
          <Text style={styles.deleteBtnText}>Xóa ngày</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  deleteBtn: {
    margin: 20,
  },
  deleteBtnText: {
    textDecorationLine: "underline",
  },
});
