import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { signUpWithEmail } from "../../../services/authService";

export default function SignUpScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Password và Confirm Password không khớp!");
      return;
    }

    try {
      setLoading(true);
      await signUpWithEmail(email, password);
    } catch (error: any) {
      Alert.alert("Lỗi đăng ký", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Sign Up</Title>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 8, backgroundColor: "#DA1249" }}
      >
        Sign up
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate("SignIn")}
        style={{ marginTop: 8 }}
        textColor="#DA1249"
      >
        Already have an account? Sign in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
    color: "#DA1249",
  },
  input: {
    marginBottom: 16,
  },
});
