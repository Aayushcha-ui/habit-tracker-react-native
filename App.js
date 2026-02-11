import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

// Screens
import LoginScreen from './Screen/LoginScreen';
import SignUpScreen from './Screen/SignUpScreen';
import HomeScreen from './Screen/HomeScreen';
import SplashScreen from './Screen/Splash Screen';
import IntroScreen from './Screen/IntroScreen';
import HabitScreen from './Screen/HabitScreen';
import TrackerScreen from './Screen/TrackerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFinished(true);
    }, 2000); // 2 seconds splash delay

    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      clearTimeout(timer);
      subscriber(); // unsubscribe
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Always show Splash first */}
        {!splashFinished ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            {/* Auth flow */}
            {!user ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
            ) : null}

            {/* App screens */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Habit" component={HabitScreen} />
            <Stack.Screen name="Tracker" component={TrackerScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
