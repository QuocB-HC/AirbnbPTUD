import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function WishlistScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>WishlistScreen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
