import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Accommodation,
  AccommodationImage,
  AccommodationRoom,
} from "../../../models/accommodation.model";
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "../../../models/profile.model";
import { getProfileById } from "../../../api/profile.api";
import moment from "moment";
import "moment/locale/vi";
import { Feature } from "../../../models/feature.model";
import { getFeaturesByAccommodationId } from "../../../api/feature.api";
import FeatureCard from "../../components/FeatureCard";
import { getRoomByAccommodationId } from "../../../api/accommodation.api";
import RoomCard from "../../components/RoomCard";
import { Amenity } from "../../../models/amenity.model";
import { getAmenitiesByAccommodationId } from "../../../api/amenity.api";
import AmenityCard from "../../components/AmenityCard";
import MapView, { Marker } from "react-native-maps";
import { Review } from "../../../models/review.model";
import ReviewCard from "../../components/ReviewCard";
import DescripionModal from "../../modals/AccommodationDetail/DescripionModal";
import AmenitiesModal from "../../modals/AccommodationDetail/AmenitiesModal";
import ReviewModal from "../../modals/AccommodationDetail/ReviewModal";
import SeeHowToReviewModal from "../../modals/AccommodationDetail/SeeHowToReviewModal";
import { City } from "../../../models/city.model";
import { getCityById } from "../../../api/city.api";
import BookingSingleCalendar from "../../components/BookingSingleCalendar";
import { Customer } from "../../../models/customer.model";
import { getImageByAccommodationId } from "../../../api/images.api";
import { useDispatch, useSelector } from "react-redux";
import EditCustomer from "../../../redux/actions/EditCustomer";
import BookingModal from "../../modals/BookingModals/BookingModal";

moment.locale("vi");

export default function AccommodationDetail({ navigation }: any) {
  const route = useRoute();
  const { accommodation, reviews, totalRating } = route.params as {
    accommodation: Accommodation;
    reviews: Review[];
    totalRating: number;
  };
  const [images, setImages] = useState<AccommodationImage[]>([]);
  const [user, setUser] = useState<Profile>();
  const [city, setCity] = useState<City>();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [rooms, setRooms] = useState<AccommodationRoom[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [isOpenDescriptionModal, setIsOpenDescriptionModal] =
    useState<boolean>(false);
  const [isOpenAmenitiesModal, setIsOpenAmenitiesModal] =
    useState<boolean>(false);
  const [isOpenReviewsModal, setIsOpenReviewsModal] = useState<boolean>(false);
  const [isOpenSeeHowToReviewModal, setIsOpenSeeHowToReviewModal] =
    useState<boolean>(false);
  const [isOpenBookingModal, setIsOpenBookingModal] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch();
  const rangeState = useSelector((state: any) => state.DateReducer.range);
  const nightsState = useSelector((state: any) => state.DateReducer.nights);

  const handleScrollToCalendar = () => {
    scrollViewRef.current?.scrollTo({
      y: 2500,
      animated: true,
    });
  };

  const handleChangeCustomer = (customer: Customer) => {
    dispatch(EditCustomer(customer));  
  };

  const openBookingModal = () => {
    const customer: Customer = {
      adult: 1,
      child: 0,
      baby: 0,
    }

    handleChangeCustomer(customer);
    setIsOpenBookingModal(true);
  };

  // Lấy thông tin host theo accommodation id
  useEffect(() => {
    getProfileById(accommodation.host_id).then(setUser);
  }, [accommodation.host_id]);

  // Lấy danh sách feature theo accommodation id
  useEffect(() => {
    const load = async () => {
      const result: Feature[] = await getFeaturesByAccommodationId(
        accommodation.id
      );
      setFeatures(result);
    };

    load();
  }, []);

  // Ẩn tab khi vào trang detail
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

    // Khi rời màn hình thì hiện lại
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  // Lấy danh sách room theo accommodation id
  useEffect(() => {
    const load = async () => {
      const result: AccommodationRoom[] = await getRoomByAccommodationId(
        accommodation.id
      );
      setRooms(result);
    };

    load();
  }, []);

  // Lấy danh sách amenity theo accommodation id
  useEffect(() => {
    const load = async () => {
      const result: Amenity[] = await getAmenitiesByAccommodationId(
        accommodation.id
      );
      setAmenities(result);
    };

    load();
  }, []);

  // Lấy city name theo id
  useEffect(() => {
    getCityById(accommodation.city).then(setCity);
  }, [accommodation.city]);

  // Lấy city image theo id
  useEffect(() => {
    getImageByAccommodationId(accommodation.id).then(setImages);
  }, [accommodation.id]);

  if (!accommodation) {
    return (
      <View style={styles.noAccommodationContainer}>
        <Text style={styles.noAccommodationText}>Không có dữ liệu chỗ ở</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container} ref={scrollViewRef}>
        <View style={styles.imageContainer}>
          {images.slice(0, 1).map((image) => (
            <Image
              key={image.id}
              style={styles.accommodationImage}
              source={{ uri: image.image_url }}
            />
          ))}

          <Ionicons
            style={styles.backIcon}
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />

          <Ionicons
            style={styles.shareIcon}
            name="share-outline"
            size={24}
            color="black"
          />
          <Ionicons
            style={styles.heartIcon}
            name="heart-outline"
            size={24}
            color="black"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.accommodationName}>{accommodation.name}</Text>

          <View style={styles.rating}>
            <Ionicons name="star" size={20} color="black" />
            <Text style={styles.ratingText}>
              {totalRating} · {reviews.length} reviews
            </Text>
          </View>

          <Text style={styles.cityAndCountry}>
            {city?.name}, {accommodation.country}
          </Text>

          <View style={styles.hostContainer}>
            <View style={styles.hostProfile}>
              <Text style={styles.hostTitle}>
                {accommodation.property_type} thuộc {user?.full_name}
              </Text>
              <Text style={styles.hostSubtitle}>
                Superhost · {moment(accommodation.created_at).fromNow()}
              </Text>
            </View>
            <View style={styles.hostAvatarContainer}>
              <Image
                source={{
                  uri: user?.avatar_url,
                }}
                style={styles.hostAvatar}
              />
            </View>
          </View>

          <View style={styles.featuresContainer}>
            {features.map((item) => (
              <FeatureCard key={item.id} feature={item} />
            ))}
          </View>

          <View style={styles.descriptionContainer}>
            <Text
              style={styles.descriptionContent}
              numberOfLines={8}
              ellipsizeMode="tail"
            >
              {accommodation.description}
            </Text>

            <TouchableOpacity
              style={styles.seeMoreBtn}
              onPress={() => setIsOpenDescriptionModal(true)}
            >
              <Text style={styles.seeMoreBtnText}>Hiển thị thêm</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.accommodationRoomContainer}>
            <Text style={styles.accommodationRoomTitle}>
              Nơi mà bạn sẽ ngủ nghỉ
            </Text>

            {rooms.map((item) => (
              <RoomCard key={item.id} room={item} />
            ))}
          </View>

          <View style={styles.amenitiesContainer}>
            <Text style={styles.amenitiesTitle}>Nơi này có gì cho bạn</Text>

            {amenities.slice(0, 6).map((item) => (
              <AmenityCard key={item.id} amenity={item} />
            ))}

            <TouchableOpacity
              style={styles.seeMoreBtn}
              onPress={() => setIsOpenAmenitiesModal(true)}
            >
              <Text style={styles.seeMoreBtnText}>
                Hiển thị tất cả {amenities.length} tiện nghi
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Nơi bạn sẽ đến</Text>
            <Text style={styles.mapSubtitle}>
              {city?.name}, {accommodation.country}
            </Text>

            <View style={styles.map}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: accommodation.latitude!,
                  longitude: accommodation.longitude!,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: accommodation.latitude!,
                    longitude: accommodation.longitude!,
                  }}
                  title={accommodation.name}
                  description={`${accommodation.city}, ${accommodation.country}`}
                />
              </MapView>
            </View>
          </View>

          <View style={styles.calenderContainer}>
            <BookingSingleCalendar city={accommodation.city} />
          </View>

          <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
              <Image
                style={styles.leftReviewHeaderImage}
                source={{
                  uri: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png",
                }}
              />
              <Text style={styles.reviewHeaderTotalRating}>{totalRating}</Text>
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.reviewList}>
                {reviews.slice(0, 20).map((item) => (
                  <ReviewCard key={item.id} reviews={item} />
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.seeMoreBtn}
              onPress={() => setIsOpenReviewsModal(true)}
            >
              <Text style={styles.seeMoreBtnText}>
                Hiển thị tất cả {reviews.length} đánh giá
              </Text>
            </TouchableOpacity>

            <Text
              style={styles.seeHowToReview}
              onPress={() => setIsOpenSeeHowToReviewModal(true)}
            >
              Tìm hiểu quy trình đánh giá
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <Text>
            {rangeState ? (
              <View style={{ gap: 10 }}>
                <Text style={styles.price}>
                  {(
                    accommodation.price_per_night * nightsState
                  ).toLocaleString()}
                  ₫
                </Text>
                <Text style={styles.date}>
                  Cho {nightsState} đêm {rangeState}
                </Text>
              </View>
            ) : (
              <Text style={{ fontSize: 15 }}>Thêm ngày để xem giá</Text>
            )}
          </Text>
        </View>

        {rangeState ? (
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => openBookingModal()}
          >
            <Text style={styles.bookText}>Đặt phòng</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => handleScrollToCalendar()}
          >
            <Text style={styles.bookText}>Chọn ngày</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Description Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenDescriptionModal}
      >
        <DescripionModal
          description={accommodation.description}
          onCloseModal={() => setIsOpenDescriptionModal(false)}
        />
      </Modal>

      {/* Amenities Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenAmenitiesModal}
      >
        <AmenitiesModal
          amenities={amenities}
          onCloseModal={() => setIsOpenAmenitiesModal(false)}
        />
      </Modal>

      {/* Reviews Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenReviewsModal}
      >
        <ReviewModal
          reviews={reviews}
          totalRating={totalRating}
          onCloseModal={() => setIsOpenReviewsModal(false)}
        />
      </Modal>

      {/* See How To Review Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenSeeHowToReviewModal}
      >
        <SeeHowToReviewModal
          onCloseModal={() => setIsOpenSeeHowToReviewModal(false)}
        />
      </Modal>

      {/* Booking Modal */}
      <Modal animationType="slide" visible={isOpenBookingModal}>
        <BookingModal
          accommodation={accommodation}
          image={images[0]}
          totalRating={totalRating}
          totalReview={reviews.length}
          totalPrice={accommodation.price_per_night * nightsState}
          navigation={navigation}
          onCloseModal={(state) => setIsOpenBookingModal(state)}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  noAccommodationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAccommodationText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: 400,
  },
  accommodationImage: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  iconRightContainer: {
    flexDirection: "row",
    gap: 20,
  },
  backIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    top: 40,
    left: 20,
  },
  shareIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    top: 40,
    right: 80,
  },
  heartIcon: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    top: 40,
    right: 20,
  },
  content: {
    padding: 30,
    paddingBottom: 100,
    backgroundColor: "white",
  },
  accommodationName: {
    fontSize: 35,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingTop: 20,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cityAndCountry: {
    fontSize: 20,
  },
  hostContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 20,
    marginVertical: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
  hostProfile: {
    width: "80%",
  },
  hostTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  hostSubtitle: {
    fontSize: 20,
  },
  hostAvatarContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  hostAvatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  featuresContainer: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    paddingRight: 20,
  },
  descriptionContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  descriptionContent: {
    fontSize: 18,
  },
  seeMoreBtn: {
    width: "100%",
    backgroundColor: "#cfcdcdff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  seeMoreBtnText: {
    fontSize: 16,
  },
  accommodationRoomContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  accommodationRoomTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  amenitiesContainer: {
    width: "100%",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  amenitiesTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  mapContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  mapTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  mapSubtitle: {
    fontSize: 18,
    marginVertical: 15,
  },
  map: {
    height: 500,
    borderRadius: 10,
    overflow: "hidden",
  },
  calenderContainer: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  reviewContainer: {
    paddingVertical: 20,
    alignItems: "center",
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
  reviewList: {
    flexDirection: "row",
    gap: 30,
  },
  seeHowToReview: {
    fontSize: 12,
    padding: 20,
    color: "gray",
    textDecorationLine: "underline",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    height: 100,
  },
  priceSection: {
    flexDirection: "column",
  },
  price: {
    color: "black",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  bookBtn: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#ff3366",
  },
  bookText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
