import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AccommodationRoom } from "../../models/accommodation.model";

type RoomProp = {
  room: AccommodationRoom;
};

export default function RoomCard({ room }: RoomProp) {
  return (
    <View>
      <Image
        style={styles.roomImage}
        source={{
          uri: "https://a0.muscache.com/im/pictures/hosting/Hosting-1353653864064161285/original/736f6de3-2004-4bab-b151-074c43995dd1.jpeg",
        }}
      />

      <Text style={styles.roomName}>{room.name}</Text>
      <Text style={styles.roomDescription}>{room.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  roomImage: {
    height: 150,
    width: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomDescription: {
    fontSize: 16,
    color: 'gray',
  },
});
