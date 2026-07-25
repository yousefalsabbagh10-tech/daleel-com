import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const Icon = MaterialCommunityIcons as any;

const icons: Record<string, [string, string]> = {
  favorites: ['heart-outline', 'heart'],
  notifications: ['bell-outline', 'bell'],
  featured: ['auto-fix', 'auto-fix'],
  index: ['home-outline', 'home'],
};

function TabIcon({ route, color, focused }: { route: string; color: string; focused: boolean }) {
  if (route === 'create') {
    return (
      <View style={styles.addButton}>
        <Icon name="plus-circle-outline" size={31} color={COLORS.white} />
      </View>
    );
  }
  const [outline, filled] = icons[route] || ['circle-outline', 'circle'];
  return (
    <View>
      <Icon name={focused ? filled : outline} size={26} color={focused ? COLORS.primary : color} />
      {route === 'notifications' ? (
        <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
      ) : null}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
        headerShown: false,
      }}
    >
      <Tabs.Screen name="favorites" options={{ title: 'المفضلة', tabBarIcon: p => <TabIcon route="favorites" {...p} /> }} />
      <Tabs.Screen name="notifications" options={{ title: 'الإشعارات', tabBarIcon: p => <TabIcon route="notifications" {...p} /> }} />
      <Tabs.Screen name="create" options={{ title: '', tabBarIcon: p => <TabIcon route="create" {...p} /> }} />
      <Tabs.Screen name="featured" options={{ title: 'المميزة', tabBarIcon: p => <TabIcon route="featured" {...p} /> }} />
      <Tabs.Screen name="index" options={{ title: 'الرئيسية', tabBarIcon: p => <TabIcon route="index" {...p} /> }} />
      <Tabs.Screen name="cars" options={{ href: null }} />
      <Tabs.Screen name="real-estate" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: COLORS.white, borderTopColor: 'rgba(201,161,90,0.34)', borderTopWidth: 1, height: 76, paddingTop: 8, paddingBottom: 12, elevation: 12 },
  label: { fontSize: 11, fontWeight: '700' },
  addButton: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#0D3B46', alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: COLORS.white, marginTop: -27, elevation: 10 },
  badge: { position: 'absolute', top: -8, right: -9, width: 20, height: 20, borderRadius: 10, backgroundColor: '#C9A15A', alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: COLORS.white, fontSize: 11, fontWeight: '900' },
});

