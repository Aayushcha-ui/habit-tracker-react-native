import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

// A simple placeholder for where an icon would be
const IconPlaceholder = ({ style }) => <View style={[styles.iconPlaceholder, style]} />;

// Reusable card component for the dashboard items
const DashboardCard = ({ title, value, unit, icon, children, cardStyle, titleStyle }) => (
  <View style={[styles.card, cardStyle]}>
    <View style={styles.cardHeader}>
      <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>
      {icon}
    </View>
    {value && <Text style={styles.cardValue}>{value}</Text>}
    {unit && <Text style={styles.cardUnit}>{unit}</Text>}
    {children}
  </View>
);

// Main component with navigation support
export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>For today</Text>
            <Text style={styles.headerDate}>Oct 29, 2024</Text>
          </View>
          <View style={styles.profileImage}></View>
        </View>

        {/* Dashboard Grid */}
        <View style={styles.dashboard}>
          {/* Walk Card */}
          <View style={[styles.card, styles.walkCard]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, styles.walkCardTitle]}>Walk</Text>
              <IconPlaceholder style={styles.walkIcon} />
            </View>
            <View style={styles.stepsCircle}>
              <View style={styles.stepsCircleInner}>
                <Text style={styles.stepsCount}>7500</Text>
                <Text style={styles.stepsUnit}>steps</Text>
              </View>
            </View>
          </View>

          {/* Water Card */}
          <DashboardCard
            title="Water"
            value="0.55"
            unit="liters"
            icon={<View style={styles.waterIcon} />}
          />

          {/* Calories Card */}
          <DashboardCard
            title="Calories"
            value="450.72"
            unit="kcal"
            icon={<View style={styles.calorieIcon} />}
            cardStyle={styles.smallCard}
          />

          {/* Heart Card */}
          <DashboardCard title="Heart" icon={<Text>♥</Text>} cardStyle={styles.heartCard}>
            <View style={styles.heartRateGraph} />
            <Text style={styles.heartRateValue}>105</Text>
            <Text style={styles.cardUnit}>bpm</Text>
          </DashboardCard>

          {/* Sleep Card */}
          <DashboardCard
            title="Sleep"
            value="08:32"
            unit="hours"
            icon={<IconPlaceholder style={{ backgroundColor: '#8a2be2' }} />}
            cardStyle={styles.smallCard}
          />
        </View>

        {/* Activity Filters */}
        <View style={styles.activityFilters}>
          <TouchableOpacity style={styles.filterButton}><Text>walking</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text>cycling</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}><Text>swimming</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerDate: {
    color: 'grey',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#cccccc',
  },
  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '48%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardUnit: {
    color: 'grey',
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  walkCard: {
    width: '48%',
    backgroundColor: '#6a5acd',
    marginRight: '4%',
  },
  walkCardTitle: {
    color: 'white',
  },
  walkIcon: {
    backgroundColor: 'white',
  },
  stepsCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  stepsCircleInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsCount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stepsUnit: {
    color: 'white',
  },
  waterIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00bfff',
  },
  smallCard: {
    height: 120,
  },
  calorieIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'orange',
  },
  heartCard: {
    width: '48%',
    height: 200,
  },
  heartRateGraph: {
    height: 80,
    borderTopWidth: 2,
    borderTopColor: 'pink',
    marginTop: 10,
  },
  heartRateValue: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityFilters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  filterButton: {
    backgroundColor: '#e9ecef',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
