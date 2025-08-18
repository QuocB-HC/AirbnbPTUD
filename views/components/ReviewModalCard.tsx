import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Profile } from "../../models/profile.model";
import { getProfileById } from "../../api/profile.api";
import { Review } from "../../models/review.model";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  review: Review;
};

export default function ReviewModalCard({ review }: Props) {
  const [user, setUser] = useState<Profile>();

  const star = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (review.rating >= i) {
        // Ngôi sao đầy
        stars.push(<Ionicons key={i} name="star" size={15} color="black" />);
      } else if (review.rating >= i - 0.5) {
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

  const getDisplayText = (created_at: any) => {
    // Chuyển timestamp SQL thành đối tượng Date
    const createdDate = new Date(created_at.replace(" ", "T"));
    const now = new Date();

    // Tính số ngày chênh lệch
    const diffMs = now.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const day = String(createdDate.getDate()).padStart(2, "0");
    const month = String(createdDate.getMonth() + 1).padStart(2, "0");
    const year = createdDate.getFullYear();
    const formattedDate = `ngày ${day} tháng ${month} năm ${year}`;

    if (diffDays < 3) {
      return `${diffDays} ngày trước`;
    } else {
      return formattedDate;
    }
  };

  useEffect(() => {
    const load = async () => {
      const result: Profile = await getProfileById(review.reviewer_id);

      setUser(result);
    };

    load();
  }, [review.reviewer_id]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.userAvatar} source={{ uri: user?.avatar_url }} />

        <View>
          <Text style={styles.userName}>{user?.full_name}</Text>
          <Text style={styles.userTime}>
            Hoạt động trên Airbnb {moment(user?.created_at).fromNow()}
          </Text>
        </View>
      </View>

      <Text style={styles.ratingContainer}>
        {star()} · {getDisplayText(review.created_at)}
      </Text>

      <Text style={styles.commentContainer}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  userContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userTime: {
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    fontWeight: "bold",
  },
  commentContainer: {
    fontSize: 16,
  },
});
