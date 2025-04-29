import React, { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router'; 
import { StudyContext } from '../StudyContext';

export default function ProfileScreen() {
  const { username, setUsername } = useContext(StudyContext);
  const [notifications, setNotifications] = React.useState(true);

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#888"
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={[styles.card, styles.inlineRow]}>
              <Text style={styles.label}>Notifications:</Text>
              <Switch
                value={notifications}
                onValueChange={() => setNotifications(!notifications)}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.card}>
              <Link href="/wallet" asChild>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuLabel}>Wallet</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuLabel}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuLabel}>Task Center</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuLabel}>Activities</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  safeArea: { flex: 1 },
  container: { padding: 20, backgroundColor: 'transparent', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20 },
  section: { width: '100%', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#FFC700', marginBottom: 10, paddingHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#FFC700', paddingBottom: 5 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20, resizeMode: 'cover' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 10, marginVertical: 10, width: '100%', borderWidth: 1, borderColor: '#FFC700', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 3, paddingHorizontal: 15 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  input: { backgroundColor: '#eee', padding: 10, borderRadius: 5, marginTop: 5, marginBottom: 10, color: '#1A1A1A' },
  inlineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  menuLabel: { fontSize: 16, fontWeight: '500', color: '#1A1A1A' },
  logoutButton: { width: '100%', marginTop: 10, alignItems: 'center', paddingVertical: 10 },
  logoutText: { fontSize: 16, color: '#F44336', fontWeight: 'bold' },
});
