import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onCloseModal: (state: boolean) => void;
};

export default function SeeHowToReviewModal({ onCloseModal }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => onCloseModal(false)}>
      <View style={styles.outsideModal}>
        <TouchableWithoutFeedback>
          <View style={styles.seeHowToReviewModal}>
            <View style={styles.seeHowToReviewContainer}>
              <View style={styles.seeHowToReviewHeader}>
                <Ionicons
                  name="close"
                  size={24}
                  color="black"
                  onPress={() => onCloseModal(false)}
                />
                <Text style={styles.seeHowToReviewTitle}>
                  Quy trình đánh giá
                </Text>
                <Text></Text>
              </View>

              <View style={styles.seeHowToReviewContent}>
                <Text style={{ marginBottom: 15, fontSize: 13 }}>
                  Những đánh giá từ khách trước đây giúp cộng đồng của chúng ta
                  hiểu thêm về từng chỗ ở. Các đánh giá được mặc định sắp xếp
                  theo mức độ phù hợp. Mức độ phù hợp được xác định dựa trên
                  thời gian đánh giá, thời gian ở và thông tin mà bạn cung cấp
                  cho chúng tôi, chẳng hạn như tiêu chí tìm kiếm đặt phòng, quốc
                  gia và ngôn ngữ ưu tiên của bạn.
                </Text>

                <Text style={{ marginBottom: 15, fontSize: 13 }}>
                  Chỉ những khách đã đặt phòng mới có thể để lại đánh giá và
                  Airbnb chỉ kiểm duyệt các đánh giá bị báo cáo là không tuân
                  thủ chính sách của chúng tôi.
                </Text>

                <Text style={{ fontSize: 13 }}>
                  Để đủ điều kiện được xếp hạng theo phân vị phần trăm hoặc gắn
                  nhãn "Được khách yêu thích", chỗ ở cho thuê cần có từ 5 đánh
                  giá trở lên trong thời gian gần đây. Tiêu chí có thể thay đổi.
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  outsideModal: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  seeHowToReviewModal: {
    backgroundColor: "white",
    width: "100%",
    height: "45%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  seeHowToReviewContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  seeHowToReviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seeHowToReviewTitle: {
    fontWeight: "bold",
  },
  seeHowToReviewContent: {
    paddingVertical: 20,
  },
});
