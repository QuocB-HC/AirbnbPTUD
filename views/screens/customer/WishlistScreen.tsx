// screens/WishlistScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getToken, getUserId } from "../../../services/authService";
import { Wishlist } from "../../../models/wishlist.model";
import { getWishListByUserId } from "../../../api/wishlist.api";

export default function WishlistScreen() {
  const navigation = useNavigation<any>();

  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [count, setCount] = useState(0);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getWishlist = async () => {
      const user_id = await getUserId();

      if (user_id) {
        const wishlist = await getWishListByUserId(user_id);
        setWishlist(wishlist);

        console.log(wishlist);
        
      }
    };

    const getCurrentToken = async () => {
      const currentToken = await getToken();

      if (currentToken) {
        setToken(currentToken);

        console.log(currentToken);
        
      }
    };

    getCurrentToken();
    getWishlist();
  }, []);


  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Yêu thích</Text>
        <Text style={{ marginTop: 12, color: "#6B7280" }}>
          Bạn cần đăng nhập để xem “Favourite”.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SigninScreen")}
          style={styles.ctaBtn}
        >
          <Text style={styles.ctaText}>Đến đăng nhập</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Yêu thích</Text>

      <View style={styles.grid}>
        <View style={styles.tileWrap}>
          <Pressable
            style={[styles.tile, loading && { opacity: 0.6 }]}
            disabled={!token}
          >
            {coverUrl ? (
              <Image source={{ uri: coverUrl }} style={styles.tileImage} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="heart-outline" size={36} color="#9AA0A6" />
              </View>
            )}
          </Pressable>

          <Text style={styles.tileTitle}>Favourite</Text>
          <Text style={styles.tileSub}>
            {loading ? "Đang tải…" : `Đã lưu ${count} mục`}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_SIZE = 150;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 12 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
  grid: { flexDirection: "row", gap: 16 },
  tileWrap: { width: CARD_SIZE },
  tile: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#ECEFF1",
  },
  tileImage: { width: "100%", height: "100%" },
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center" },
  tileTitle: { marginTop: 8, fontWeight: "600" },
  tileSub: { marginTop: 2, color: "#6B7280", fontSize: 12 },
  ctaBtn: {
    marginTop: 16, backgroundColor: "black",
    paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10
  },
  ctaText: { color: "white", fontWeight: "600" },
});
