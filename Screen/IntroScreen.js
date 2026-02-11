import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

export default function IntroScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Text style={styles.header}>Habit Chain</Text>

      <Text style={styles.title}>Welcome to Habit Chain</Text>
      <Text style={styles.description}>
        Habit Chain is your personal companion for building and maintaining
        positive habits. Track your daily progress, earn reward points, and
        redeem exciting rewards. Let's get started!
      </Text>

      <Text style={styles.sectionTitle}>App Overview</Text>

      <View style={styles.feature}>
        <Ionicons name="walk" size={24} color="#6C63FF" style={styles.icon} />
        <View>
          <Text style={styles.featureTitle}>Welcome/Onboarding</Text>
          <Text style={styles.featureText}>
            Your one-time guide. Begin your log-in to access your personalized habit-tracking journey.
          </Text>
        </View>
      </View>

      <View style={styles.feature}>
        <MaterialIcons name="home" size={24} color="#6C63FF" style={styles.icon} />
        <View>
          <Text style={styles.featureTitle}>Home Screen</Text>
          <Text style={styles.featureText}>
            Access your daily dashboard, view your daily tasks, and monitor your habit progress.
          </Text>
        </View>
      </View>

      <View style={styles.feature}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#6C63FF" style={styles.icon} />
        <View>
          <Text style={styles.featureTitle}>Habit Details</Text>
          <Text style={styles.featureText}>
            Dive deeper into individual habits. Set goals, streaks, reminders, and track completion.
          </Text>
        </View>
      </View>

      <View style={styles.feature}>
        <FontAwesome5 name="store" size={24} color="#6C63FF" style={styles.icon} />
        <View>
          <Text style={styles.featureTitle}>Marketplace</Text>
          <Text style={styles.featureText}>
            Use reward points to unlock themes and features. Make tracking more fun and useful!
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tips for Success</Text>
      <Text style={styles.tip}>
        Consistency is key! Aim to complete your habits daily to maintain your streak and unlock rewards. Start small and gradually increase the difficulty as you progress. Celebrate your achievements and stay motivated!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    color: '#222',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginVertical: 12,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  featureText: {
    fontSize: 14,
    color: '#555',
  },
  tip: {
    fontSize: 14,
    color: '#444',
    marginVertical: 10,
    lineHeight: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
