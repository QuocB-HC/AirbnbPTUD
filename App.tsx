import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { JSX, useEffect, useState } from "react";
import AuthNavigation from "./navigation/AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";
import { supabase } from "./lib/supabase";
import { getUserId } from "./services/authService";
import { getProfileUserTypeById } from "./api/profile.api";
import HostCenterScreen from "./views/screens/host/HostCenterScreen";
import GuestNavigationTab from "./navigation/GuestNavigationTab";
import AdminNavigationTab from "./navigation/AdminNavigationTab";

const roleScreens: Record<string, JSX.Element> = {
  Guest: <GuestNavigationTab />,
  Host: <HostCenterScreen />,
  Admin: <AdminNavigationTab />,
};

export default function App() {
  const [session, setSession] = useState<string | null>(null);
  const [userType, setUserType] = useState<string>("Guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session.access_token);
      } else {
        setSession(null);
      }
      setLoading(false);
    };

    checkSession();

    // Theo dõi thay đổi session
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setSession(session.access_token);
        } else {
          setSession(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getUserTypeById = async () => {
      const user_id = await getUserId();

      if (user_id) {
        const type = await getProfileUserTypeById(user_id);
        setUserType(type);
      }
    };

    getUserTypeById();
  }, [session]);

  if (loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            {session ? (
              roleScreens[userType] ?? <AuthNavigation />
            ) : (
              <AuthNavigation />
            )}
          </View>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
