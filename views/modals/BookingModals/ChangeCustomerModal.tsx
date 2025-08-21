import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Customer } from "../../../models/customer.model";
import { useDispatch, useSelector } from "react-redux";
import EditCustomer from "../../../redux/actions/EditCustomer";

type Props = {
  limit: number;
  onCloseModal: (state: boolean) => void;
};

export default function ChangeCustomerModal({ limit, onCloseModal }: Props) {
  const [customer, setCustomer] = useState<Customer>({
    adult: 0,
    child: 0,
    baby: 0,
  });
  const customerState = useSelector((state: any) => state.customer.customer);
  const dispatch = useDispatch();
  const [isLimit, setIsLimit] = useState(false);

  const handleDecrease = (key: keyof Customer) => {
    const newCustomer = {
      ...customer,
      [key]: customer[key] - 1,
    };

    setCustomer(newCustomer);
    setIsLimit(false);
    dispatch(EditCustomer(newCustomer));
  };

  const handleIncrease = (key: keyof Customer) => {
    const newCustomer = {
      ...customer,
      [key]: customer[key] + 1,
    };

    const guest =
      newCustomer.adult * 1 + newCustomer.child * 0.5 + newCustomer.baby * 0.25;

    setCustomer(newCustomer);
    setIsLimit(false);
    dispatch(EditCustomer(newCustomer));

    if (guest >= limit) {
      setIsLimit(true);
      return;
    }
  };

  useEffect(() => {
    console.log(customerState);
    setCustomer(customerState);
  }, []);

  return (
    <View style={styles.outsideModal}>
      <View style={styles.bookingCalendarModal}>
        <Ionicons
          style={styles.closeButton}
          name="close"
          size={24}
          color="black"
          onPress={() => onCloseModal(false)}
        />

        <View style={styles.container}>
          <Text style={styles.title}>Khách</Text>

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

              {isLimit ? (
                <Pressable
                  style={{ width: 30, height: 30 }}
                  onPress={() => handleIncrease("adult")}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>+</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.customerItemIncreaseButtonContainer}
                  onPress={() => handleIncrease("adult")}
                >
                  <Text style={styles.customerItemIncreaseButton}>+</Text>
                </Pressable>
              )}
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

              {isLimit ? (
                <Pressable
                  style={{ width: 30, height: 30 }}
                  onPress={() => handleIncrease("adult")}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>+</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.customerItemIncreaseButtonContainer}
                  onPress={() => handleIncrease("child")}
                >
                  <Text style={styles.customerItemIncreaseButton}>+</Text>
                </Pressable>
              )}
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

              {isLimit ? (
                <Pressable
                  style={{ width: 30, height: 30 }}
                  onPress={() => handleIncrease("adult")}
                >
                  <Text style={{ fontSize: 16, color: "white" }}>+</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.customerItemIncreaseButtonContainer}
                  onPress={() => handleIncrease("baby")}
                >
                  <Text style={styles.customerItemIncreaseButton}>+</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  container: {
    flex: 1,
    marginVertical: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
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
    fontSize: 14,
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
});
