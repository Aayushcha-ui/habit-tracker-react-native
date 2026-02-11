import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { COLORS, SHADOW } from '../componate/theme.js'; 

export default function LoginScreen() {
  const navigation = useNavigation();
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);
      setError('');
      Alert.alert("Welcome", "Logged in successfully");
      console.log("User logged in, navigating to Home...");
      navigation.replace('Intro'); // Make sure 'Home' matches your Stack.Screen name
    } catch (e) {
      console.error("Login Error:", e);
      if (e.code === 'auth/user-not-found') setError('No user found with that email.');
      else if (e.code === 'auth/wrong-password') setError('Incorrect password.');
      else if (e.code === 'auth/invalid-email') setError('Invalid email format.');
      else setError('Login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken || userInfo.data?.idToken;
      if (!idToken) {
        setError('Google Sign-In failed: No ID token received.');
        return;
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setError('');
      Alert.alert("Welcome", "Signed in with Google");
      console.log("Google Sign-In success, navigating to Home...");
      navigation.replace('Home'); // Ensure this matches the screen name in navigator
    } catch (e) {
      console.error("Google Sign-In Error:", e);
      if (e.code === statusCodes.SIGN_IN_CANCELLED) setError('Google Sign-in cancelled');
      else if (e.code === statusCodes.IN_PROGRESS) setError('Google Sign-in in progress');
      else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) setError('Google Play Services not found');
      else setError('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoBox}>
        <Ionicons name="link-outline" size={36} color={COLORS.white} />
        <Text style={styles.title}>HabitChain</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>LogIn</Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={22} color={COLORS.gradientStart} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email Address"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={(text) => { setEmail(text); setError(''); }}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={22} color={COLORS.gradientStart} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.textLight}
            value={password}
            onChangeText={(text) => { setPassword(text); setError(''); }}
            secureTextEntry={secure}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleSignIn}>
          <Text style={styles.primaryBtnText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
          <Ionicons name="logo-google" size={18} color="#4285F4" />
          <Text style={styles.googleBtnText}>Continue with Google</Text>
        </TouchableOpacity>
        <View style={styles.bottomText}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: COLORS.accentSecondary, fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gradientStart,
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: 4,
    letterSpacing: 1,
  },
  card: {
    width: '92%',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 22,
    marginVertical: 12,
    ...SHADOW,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.gradientStart,
    marginBottom: 8,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F8',
    borderRadius: 10,
    marginBottom: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  input: {
    flex: 1,
    paddingVertical: 11,
    fontSize: 15,
    marginLeft: 7,
    color: COLORS.textDark,
  },
  primaryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    marginTop: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  googleBtn: {
    flexDirection: 'row',
    marginTop: 14,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  googleBtnText: {
    color: COLORS.textLight,
    fontWeight: '500',
    marginLeft: 8,
  },
  bottomText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  }
});
