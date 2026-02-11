import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, StatusBar
} from 'react-native';

const initialHabits = [
  { id: 1, name: 'Morning Meditation 🧘‍♂️', color: '#A390F0', streak: 3, checked: true },
  { id: 2, name: 'Read 30 Minutes 📖', color: '#7CE7F9', streak: 3, checked: true },
  { id: 3, name: 'Workout 🏋️‍♂️', color: '#FBA1B7', streak: 1, checked: true },
  { id: 4, name: 'Drink Water 💧', color: '#A8D8EA', streak: 3, checked: true },
  { id: 5, name: 'Weekly Planning 🗓️', color: '#C1F2B0', streak: 1, checked: true },
];

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState(initialHabits);

  const toggleCheck = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, checked: !habit.checked } : habit
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <Text style={styles.title}>My Habits</Text>

      <View style={styles.streakBox}>
        <Text style={styles.streakLabel}>Streak Points</Text>
        <Text style={styles.streakPoints}>150</Text>
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Habit')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
        <TextInput
          placeholder="Search habits..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      {/* Habit List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {habits.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleCheck(item.id)}
            style={styles.habitItem}
            activeOpacity={0.9}
          >
            <View style={[styles.habitIcon, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 18 }}>✔️</Text>
            </View>
            <View style={styles.habitInfo}>
              <Text style={styles.habitName}>{item.name}</Text>
              <Text style={styles.habitStreak}>{item.streak} day streak 🔥</Text>
            </View>
            <View style={[styles.checkmark, { backgroundColor: item.checked ? '#22c55e' : '#ddd' }]}>
              <Text style={{ fontSize: 16, color: 'white' }}>{item.checked ? '✓' : ''}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation (Dummy Icons) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🛍️</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#f9fafb',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 30,
    marginLeft: 10,
  },
  streakBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    width: '60%',
    elevation: 4,
  },
  streakLabel: {
    color: '#666',
    fontSize: 14,
  },
  streakPoints: {
    color: '#7c3aed',
    fontSize: 24,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 740,
    right: 30,
    backgroundColor: '#7c3aed',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  fabText: {
    color: 'white',
    fontSize: 28,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#111',
    fontSize: 16,
  },
  habitItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitInfo: {
    flex: 1,
    marginLeft: 12,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
  },
  habitStreak: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  checkmark: {
    padding: 6,
    borderRadius: 6,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  navIcon: {
    fontSize: 24,
  },
});
