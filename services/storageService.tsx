import { supabase } from "../lib/supabase";
import * as FileSystem from "expo-file-system";

export const UploadImage = async (
  accommodationId: string,
  image: any,
  bucket: string = "accommodation_images"
) => {
  if (!image) return null;

  const filePath = `${accommodationId}/${
    image.fileName || Date.now() + "_upload.jpg"
  }`;
  console.log(filePath);

  try {
    const base64 = await FileSystem.readAsStringAsync(image.uri, {
      encoding: "base64",
    });
    // console.log(base64)
    const binary = atob(base64);
    // console.log(binary);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    // Upload lên Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, bytes, {
        contentType: image.mimeType,
      });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    // Lấy public URL
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log(publicUrl.publicUrl);

    return publicUrl.publicUrl;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
