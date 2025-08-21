import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { CalendarList } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from "../../models/date.model";
import { EditDate, EditNights, EditRange } from "../../redux/actions/EditDate";

type Props = {
  onChangDate: (date: {
    checkInDate: string | null;
    checkOutDate: string | null;
  }) => void;
};

export default function BookingMultiCalendar() {
  const today = new Date().toISOString().split("T")[0];
  const [range, setRange] = useState<DateRange>({
    checkInDate: null,
    checkOutDate: null,
  });
  const dispatch = useDispatch();
  const dateState = useSelector((state: any) => state.DateReducer.date);

  useEffect(() => {
    setRange(dateState);
  }, []);

  const handleDateChange = (
    newDate: DateRange,
    rangeText: string | null,
    totalNights: number
  ) => {
    dispatch(EditDate(newDate));
    dispatch(EditRange(rangeText));
    dispatch(EditNights(totalNights));
  };

  const formatRange = (start: string | null, end: string | null) => {
    if (!start || !end) return null;

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    const startDay = startDateObj.getDate();
    const endDay = endDateObj.getDate();

    const month = startDateObj.getMonth() + 1; // JS month bắt đầu từ 0

    return `${startDay} - ${endDay} thg ${month}`;
  };

  const nights = () => {
    if (!range.checkInDate || !range.checkOutDate) return 0;
    const start = new Date(range.checkInDate);
    const end = new Date(range.checkOutDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calcNights = (start: string | null, end: string | null) => {
    if (!start || !end) return 0;
    const startD = new Date(start);
    const endD = new Date(end);
    return Math.ceil(
      (endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

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

      if (newRange.checkInDate && newRange.checkOutDate) {
        const rangeText = formatRange(
          newRange.checkInDate,
          newRange.checkOutDate
        );
        const totalNights = calcNights(
          newRange.checkInDate,
          newRange.checkOutDate
        );

        handleDateChange(newRange, rangeText, totalNights);
      }
    }

    setRange(newRange);
    dispatch(EditDate(newRange));
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
