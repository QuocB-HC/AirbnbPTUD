import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Review } from "../../../models/review.model";
import SeeHowToReviewModal from "./SeeHowToReviewModal";
import { Picker } from "@react-native-picker/picker";
import ReviewModalCard from "../../components/ReviewModalCard";

type ReviewProp = {
  reviews: Review[];
  totalRating: number;
  onCloseModal: (state: boolean) => void;
};

export default function ReviewModal({
  reviews,
  totalRating,
  onCloseModal,
}: ReviewProp) {
  const [isOpenSeeHowToReviewModal, setIsOpenSeeHowToReviewModal] =
    useState<boolean>(false);

  const [sortTypes, setSortTypes] = useState([
    { id: 1, name: "Mới nhất" },
    { id: 2, name: "Cũ nhất" },
    { id: 3, name: "Có điểm xếp hạng cao nhất" },
    { id: 4, name: "Có điểm xếp hạng thấp nhất" },
  ]);
  const [sortType, setSortType] = useState(1);

  return (
    <>
      <Pressable
        style={styles.outsideModal}
        onPress={() => onCloseModal(false)}
      >
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                onPress={() => onCloseModal(false)}
              />
              <Text />
            </View>

            <View style={styles.modalBody}>
              <View style={styles.reviewHeader}>
                <Image
                  style={styles.leftReviewHeaderImage}
                  source={{
                    uri: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png",
                  }}
                />
                <Text style={styles.reviewHeaderTotalRating}>
                  {totalRating}
                </Text>
                <Image
                  style={styles.rightReviewHeaderImage}
                  source={{
                    uri: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png",
                  }}
                />
              </View>

              <View style={styles.bottomReviewHeader}>
                <Text style={styles.bottomReviewHeaderTitle}>
                  Được khách yêu thích
                </Text>

                <Text style={styles.bottomReviewHeaderSubtitle}>
                  Nhà này được khách yêu thích dựa trên điểm xếp hạng, lượt đánh
                  giá và độ tin cậy
                </Text>
              </View>

              <View style={styles.reviewsModalContent}>
                <View style={styles.reviewsModalContentHeader}>
                  <View>
                    <Text style={{ fontSize: 20 }}>
                      {reviews.length} lượt đánh giá
                    </Text>

                    <Text
                      style={styles.seeHowToReview}
                      onPress={() => setIsOpenSeeHowToReviewModal(true)}
                    >
                      Tìm hiểu quy trình đánh giá
                    </Text>
                  </View>

                  <View style={styles.sortTypePickerWrapper}>
                    <Picker
                      style={styles.sortTypePicker}
                      mode="dialog"
                      selectedValue={sortType}
                      onValueChange={(itemValue) => setSortType(itemValue)}
                    >
                      {sortTypes.map((item) => (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.name}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.reviewList}>
                  {reviews.map((review) => (
                    <ReviewModalCard key={review.id} review={review} />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>

      <Modal
        visible={isOpenSeeHowToReviewModal}
        transparent={true}
        animationType="slide"
      >
        <SeeHowToReviewModal
          onCloseModal={() => setIsOpenSeeHowToReviewModal(false)}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  outsideModal: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    width: "100%",
    height: "95%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalContainer: {
    padding: 20,
  },
  modalHeader: {
    height: "auto",
    paddingVertical: 20,
    flexDirection: "row",
  },
  modalBody: {
    paddingBottom: 50,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  leftReviewHeaderImage: {
    width: 100,
    height: 150,
  },
  reviewHeaderTotalRating: {
    fontSize: 70,
    fontWeight: "bold",
  },
  rightReviewHeaderImage: {
    width: 100,
    height: 150,
  },
  bottomReviewHeader: {
    alignItems: "center",
    paddingBottom: 40,
    gap: 10,
  },
  bottomReviewHeaderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomReviewHeaderSubtitle: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  reviewsModalContent: {},
  reviewsModalContentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sortTypePickerWrapper: {
    width: "35%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 40,
    overflow: "hidden",
    paddingLeft: 10,
  },
  sortTypePicker: {
    width: "100%",
  },
  seeHowToReview: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "underline",
  },
  reviewList: {
    paddingVertical: 30,
    gap: 20,
  },
});
