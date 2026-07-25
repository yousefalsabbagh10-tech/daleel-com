import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppContext';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" backgroundColor={COLORS.primary} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.offWhite } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="map" />
          <Stack.Screen name="real-estate/category/[id]" />
          <Stack.Screen name="cars/brand/[id]" />
          <Stack.Screen name="details/property/[id]" options={{ headerShown: true, headerTitle: 'تفاصيل العقار' }} />
          <Stack.Screen name="details/car/[id]" options={{ headerShown: true, headerTitle: 'تفاصيل السيارة' }} />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
