import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Review } from "../../models/review.model";
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "../../models/profile.model";
import { getProfileById } from "../../api/profile.api";

type ReviewProp = {
  reviews: Review;
};

export default function ReviewCard({ reviews }: ReviewProp) {
  const [user, setUser] = useState<Profile>();
  const date = new Date(reviews.created_at);

  const formattedDate = `ngày ${date.getDate()} tháng ${
    date.getMonth() + 1
  } năm ${date.getFullYear()}`;

  const star = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (reviews.rating >= i) {
        // Ngôi sao đầy
        stars.push(<Ionicons key={i} name="star" size={15} color="black" />);
      } else if (reviews.rating >= i - 0.5) {
        // Ngôi sao nửa
        stars.push(
          <Ionicons key={i} name="star-half" size={15} color="black" />
        );
      } else {
        // Ngôi sao rỗng
        stars.push(
          <Ionicons key={i} name="star-outline" size={15} color="black" />
        );
      }
    }

    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  };

  useEffect(() => {
    const load = async () => {
      const result: Profile = await getProfileById(reviews.reviewer_id);

      setUser(result);
    };

    load();
  }, [reviews.reviewer_id]);

  return (
    <View style={styles.container}>
      <View style={styles.reviewHeader}>
        <Text>{star()}</Text>
        <Text style={styles.reviewDate}>{formattedDate}</Text>
      </View>

      <Text numberOfLines={5} ellipsizeMode="tail">{reviews.comment}</Text>

      <View style={styles.userContainer}>
        <Image style={styles.userAvatar} source={{ uri: user?.avatar_url }} />
        <Text style={styles.userName}>{user?.full_name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    paddingRight: 10,
    borderRightWidth: 0.3,
    borderLeftColor: "gray",
    marginBottom: 30,
    gap: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    gap: 20,
  },
  reviewDate: {
    fontSize: 10,
  },
  userContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  userName: {},
});
