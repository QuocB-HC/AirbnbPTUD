import { StyleSheet, View } from "react-native";
import NavigationTab from "./navigation/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import AuthNavigation from "./navigation/AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Profile } from "./models/profile.model";
import { getProfileById } from "./api/profile.api";
import UploadImage from "./InputImageScreen";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  const [checkUser, setCheckUser] = useState<Profile>();
  const [session, setSession] = useState<Session | null>(null);

  // Lấy session ban đầu
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Lấy profile khi session thay đổi
  useEffect(() => {
    if (!session?.user.id) return;

    const getUser = async () => {
      const user = await getProfileById(session.user.id);
      setCheckUser(user);
    };

    getUser();
  }, [session]);

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            {session && session.user ? (
              checkUser?.user_type !== "Host" ? (
                <NavigationTab />
              ) : (
                <UploadImage
                  accommodationId={"9c033c75-1c38-4968-996b-c4b6bc86a279"}
                />
              )
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
  },
});
