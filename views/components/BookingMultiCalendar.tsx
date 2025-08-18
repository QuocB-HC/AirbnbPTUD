import React, { useState } from "react";
import { Dimensions } from "react-native";
import { CalendarList } from "react-native-calendars";

type Props = {
  onChangDate?: (date: {
    checkInDate: string | null;
    checkOutDate: string | null;
  }) => void;
};

export default function BookingMultiCalendar({ onChangDate }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [range, setRange] = useState<{
    checkInDate: string | null;
    checkOutDate: string | null;
  }>({
    checkInDate: null,
    checkOutDate: null,
  });

  const onDayPress = (day: any) => {
    let newRange = { ...range };

    if (!range.checkInDate || (range.checkInDate && range.checkOutDate)) {
      newRange = { checkInDate: day.dateString, checkOutDate: null };
    } else {
      if (day.dateString > range.checkInDate) {
        newRange = { ...range, checkOutDate: day.dateString };
      } else {
        newRange = { checkInDate: day.dateString, checkOutDate: null };
      }

      if (newRange.checkInDate && newRange.checkOutDate && onChangDate) {
        onChangDate(newRange);
      }
    }

    setRange(newRange);
  };

  const getMarkedDates = () => {
    const marked: any = {};

    if (range.checkInDate) {
      marked[range.checkInDate] = {
        startingDay: true,
        color: "#000",
        textColor: "#fff",
      };
    }

    if (range.checkOutDate) {
      marked[range.checkOutDate] = {
        endingDay: true,
        color: "#000",
        textColor: "#fff",
      };

      let start = new Date(range.checkInDate!);
      let end = new Date(range.checkOutDate);

      let current = new Date(start);
      current.setDate(current.getDate() + 1);

      while (current < end) {
        const dateStr = current.toISOString().split("T")[0];
        marked[dateStr] = { color: "#ccc", textColor: "#000" };
        current.setDate(current.getDate() + 1);
      }
    }

    return marked;
  };

  return (
    <CalendarList
      style={{
        width: Dimensions.get("window").width,
        height: "100%",
        alignSelf: "center",
        transform: [{ scale: 0.9 }],
      }}
      minDate={today}
      onDayPress={onDayPress}
      pastScrollRange={0}
      futureScrollRange={6}
      scrollEnabled
      showScrollIndicator={false}
      firstDay={1}
      markedDates={getMarkedDates()}
      markingType="period"
    />
  );
}
