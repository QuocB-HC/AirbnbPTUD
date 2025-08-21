import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Profile } from "../../../models/profile.model";
import { getProfileOfHost } from "../../../api/profile.api";
import { signOut } from "../../../services/authService";

export default function HostManagementScreen() {
  const [hosts, setHosts] = useState<Profile[]>([]);

  useEffect(() => {
    const getAllHost = async () => {
      const host = await getProfileOfHost();

      setHosts(host);
    };

    getAllHost();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Name</Text>
        <Text style={[styles.cell, styles.headerText]}>Email</Text>
        <Text style={[styles.cell, styles.headerText]}>Phone</Text>
      </View>

      {/* Body */}
      {hosts.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.cell}>{item.full_name}</Text>
          <Text style={styles.cell}>{item.email}</Text>
          <Text style={styles.cell}>{item.phone_number}</Text>
        </View>
      ))}

      <Pressable onPress={() => signOut()}>
        <Text>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
});
