import React, { useState } from "react";
import { View, Button, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "./lib/supabase";
import { signOut } from "./services/authService";

const UploadImage = ({ accommodationId }: { accommodationId: string }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Upload ảnh lên Supabase Storage và lưu vào DB
  const uploadImage = async () => {
    if (!imageUri) return Alert.alert("Chưa chọn ảnh");

    try {
      setLoading(true);

      // Lấy file từ URI
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Tạo tên file duy nhất
      const fileName = `${accommodationId}/${Date.now()}.jpg`;

      // Upload vào Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("accommodation_images") // tên bucket đã tạo trong Supabase
        .upload(fileName, blob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      // Lấy public URL
      const { data } = supabase.storage
        .from("accommodation_images")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // Lưu URL vào bảng accommodation_images
      const { error: dbError } = await supabase
        .from("accommodation_images")
        .insert([{ accommodation_id: accommodationId, image_url: publicUrl }]);

      if (dbError) throw dbError;

      Alert.alert("Thành công", "Ảnh đã được lưu vào Supabase");
    } catch (err: any) {
      Alert.alert("Lỗi", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 20,
        justifyContent: "center",
        flex: 1,
      }}
    >
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Button title="Chọn ảnh" onPress={pickImage} />
          <View style={{ marginVertical: 10 }} />
          <Button title="Upload ảnh" onPress={uploadImage} />
          <Button title="Đăng xuất" onPress={signOut} />
        </>
      )}
    </View>
  );
};

export default UploadImage;
