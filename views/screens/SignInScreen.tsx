import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmail } from "../../services/authService";

export default function SignInScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    try {
      setLoading(true);
      const { user } = await signInWithEmail(email, password);
      if (user) {
        Alert.alert("Đăng nhập thành công", `Xin chào ${user.email}`);
      }
    } catch (error: any) {
      Alert.alert("Lỗi đăng nhập", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Sign In</Title>

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

      <Button
        mode="contained"
        onPress={handleSignIn}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 8, backgroundColor: "#DA1249" }}
      >
        Sign in
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate("SignUp")}
        style={{ marginTop: 8 }}
        textColor="#DA1249"
      >
        Don't have an account? Sign up
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
