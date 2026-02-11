import React, { useState } from 'react';
import {
  View, TextInput, Text, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, SHADOW } from '../componate/theme.js';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirm || !fullname) {
      setError('Please fill all fields including Full Name.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email.trim(), password);
      setError('');
      Alert.alert("Success", "User created successfully");
      navigation.replace('Home');
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') setError('Email already in use.');
      else if (e.code === 'auth/invalid-email') setError('Invalid email format.');
      else if (e.code === 'auth/weak-password') setError('Password too weak.');
      else setError('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoBox}>
        <Ionicons name="link-outline" size={36} color={COLORS.white} />
        <Text style={styles.title}>HabitChain</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Create Account</Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={22} color={COLORS.gradientStart} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={COLORS.textLight}
            value={fullname}
            onChangeText={(text) => { setFullname(text); setError(''); }}
            autoCapitalize="words"
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={22} color={COLORS.gradientStart} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email Address"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={(text) => { setEmail(text); setError(''); }}
            keyboardType="email-address"
            style={styles.input}
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
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={22} color={COLORS.gradientStart} />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.textLight}
            value={confirm}
            onChangeText={(text) => { setConfirm(text); setError(''); }}
            secureTextEntry={secure}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleSignUp}>
          <Text style={styles.primaryBtnText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.bottomText}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: COLORS.accentSecondary, fontWeight: 'bold' }}>Sign In</Text>
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
