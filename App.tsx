import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationTab from './navigation/NavigationTab';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
