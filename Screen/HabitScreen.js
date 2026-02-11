import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';

const AddHabitScreen = ({ navigation }) => {
  const [habitName, setHabitName] = useState('');
  const [duration, setDuration] = useState('15');
  const [unit, setUnit] = useState('Minutes');
  const [selectedDate, setSelectedDate] = useState(null);

  const [icon, setIcon] = useState('running'); // default icon
  const [iconLib, setIconLib] = useState('FontAwesome5'); // default library

  const handleUnitToggle = (type) => setUnit(type);

  const handleSave = () => {
    const newHabit = {
      habitName,
      duration,
      unit,
      selectedDate,
      icon,
      iconLib,
    };

    navigation.navigate('Home', { newHabit });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <Text style={styles.header}>Add New Habit</Text>

      <Text style={styles.label}>Habit Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Morning Walk"
        value={habitName}
        onChangeText={setHabitName}
      />

      <Text style={styles.label}>Duration</Text>
      <View style={styles.durationRow}>
        <TextInput
          style={styles.durationInput}
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <TouchableOpacity
          style={[styles.unitButton, unit === 'Minutes' && styles.unitSelected]}
          onPress={() => handleUnitToggle('Minutes')}
        >
          <Text style={[styles.unitText, unit === 'Minutes' && styles.unitTextSelected]}>
            Minutes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unitButton, unit === 'Hours' && styles.unitSelected]}
          onPress={() => handleUnitToggle('Hours')}
        >
          <Text style={[styles.unitText, unit === 'Hours' && styles.unitTextSelected]}>
            Hours
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Schedule (Optional)</Text>
      <Text style={styles.subText}>Pick a starting date for this habit</Text>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#6200ee',
            selectedTextColor: '#fff',
          },
        }}
        theme={{
          arrowColor: '#6200ee',
          todayTextColor: '#6200ee',
        }}
      />

      <Text style={styles.label}>Choose Icon Library</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={iconLib}
          onValueChange={(itemValue) => setIconLib(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="FontAwesome5" value="FontAwesome5" />
          <Picker.Item label="Ionicons" value="Ionicons" />
          <Picker.Item label="Feather" value="Feather" />
          <Picker.Item label="MaterialIcons" value="MaterialIcons" />
        </Picker>
      </View>

      <Text style={styles.label}>Icon Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., running, book, dumbbell"
        value={icon}
        onChangeText={setIcon}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Habit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddHabitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  header: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  durationInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
    marginLeft: 5,
  },
  unitSelected: {
    backgroundColor: '#6200ee',
  },
  unitText: {
    color: '#6200ee',
    fontWeight: '600',
  },
  unitTextSelected: {
    color: '#fff',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
 
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    bottom:30
  },
  cancelText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#6200ee',
    marginLeft: 10,
    // top: 30,
    bottom: 30,
    // paddingBottom: 14,
    marginBottom: 20,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
