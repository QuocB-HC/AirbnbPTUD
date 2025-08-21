import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Accommodation,
  AccommodationImage,
} from "../../models/accommodation.model";
import { Review } from "../../models/review.model";
import { getReviewsByAccommodationId } from "../../api/review.api";
import { City } from "../../models/city.model";
import { getCityById } from "../../api/city.api";
import { getImageByAccommodationId } from "../../api/images.api";

type Props = {
  accommodation: Accommodation;
  navigation: any;
};

const AccommodationCard: React.FC<Props> = ({ accommodation, navigation }) => {
  const [like, setLike] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalRating, setTotalRating] = useState(0);
  const [city, setCity] = useState<City>();
  const [images, setImages] = useState<AccommodationImage[]>([]);

  useEffect(() => {
    const load = async () => {
      const result: Review[] = await getReviewsByAccommodationId(
        accommodation.id
      );
      setReviews(result);

      const accommodationImage: AccommodationImage[] =
        await getImageByAccommodationId(accommodation.id);
      setImages(accommodationImage);
    };

    load();
  }, [accommodation.id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((sum, item) => sum + item.rating, 0);
      setTotalRating(total / reviews.length);
    } else {
      setTotalRating(0);
    }
  }, [reviews]);

  useEffect(() => {
    getCityById(accommodation.city).then(setCity);
  }, [accommodation.city]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Accommodation Detail", {
          accommodation,
          reviews,
          totalRating,
          screenOptions: { tabBarStyle: { display: "none" } },
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {images.slice(0, 1).map((image) => (
            <Image
              source={{ uri: image.image_url }}
              style={styles.image}
              key={image.id}
            />
          ))}
          <TouchableOpacity style={styles.heartIcon}>
            <Ionicons
              name={like ? "heart" : "heart-outline"}
              size={30}
              color={like ? "red" : "white"}
              onPress={() => setLike(!like)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name}>
              {accommodation.property_type} tại {city?.name},{" "}
              {accommodation.country}
            </Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="black" />
              <Text style={styles.ratingText}>
                {totalRating} ({reviews.length})
              </Text>
            </View>
          </View>

          <Text style={styles.price}>
            đ{accommodation.price_per_night.toLocaleString()} night
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AccommodationCard;

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
    paddingBottom: 12,
  },
  imageContainer: {
    position: "relative",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 20,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 15,
    padding: 5,
  },
  dotContainer: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
  content: {
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    cursor: "pointer",
    maxWidth: "80%",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
  },
});
