import { StyleSheet, View } from "react-native";
import NavigationTab from "./navigation/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AuthNavigation from "./navigation/AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";
import { getToken } from "./services/authService";
import { supabase } from "./lib/supabase";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // thêm loading để tránh nhấp nháy

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setToken(data.session.access_token);
      } else {
        setToken(null);
      }
      setLoading(false);
    };

    checkSession();

    // Theo dõi thay đổi session
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setToken(session.access_token);
        } else {
          setToken(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            {token ? <NavigationTab /> : <AuthNavigation />}
          </View>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
