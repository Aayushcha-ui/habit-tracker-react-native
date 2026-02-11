import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the next screen (e.g., Onboarding or Home)
      navigation.replace('HomeScreen'); // change this as needed
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6A5AE0" barStyle="light-content" />
      <View style={styles.centerContent}>
        <Image
          source={require('../Image/Logo.png')} // Adjust path based on your structure
          style={styles.logo}
          resizeMode="contain"
        />
        {/* <Text style={styles.title}>HabitChain</Text> */}
      </View>
      <Text style={styles.tagline}>🚀 Small Steps .Big Streaks 🔗</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A5AE0', // same purple tone
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 300,
    width: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
  },
  tagline: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
  },
});
