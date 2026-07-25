import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { NativeIcon } from '../../components/common/NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

const notifications = [
  { id: '1', title: 'تم تحديث الإعلانات العقارية', body: 'توجد عروض عقارية جديدة قريبة من بحثك.' },
  { id: '2', title: 'إعلانك قيد المتابعة', body: 'يمكنك تعديل الإعلان أو تمييزه من لوحة التحكم لاحقاً.' },
];

export default function NotificationsTab() {
  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>الإشعارات</Text></View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.icon}><NativeIcon name="notifications-outline" size={22} color={COLORS.primary} /></View>
            <View style={styles.body}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.body}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: { backgroundColor: COLORS.primary, paddingTop: 42, paddingHorizontal: SPACING.xl, paddingBottom: SPACING.lg, alignItems: 'flex-end' },
  headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: '900', color: COLORS.white },
  list: { padding: SPACING.lg, paddingBottom: 105, gap: SPACING.md },
  card: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.xl, padding: SPACING.lg, flexDirection: 'row-reverse', gap: SPACING.md, elevation: 4 },
  icon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(246,242,232,0.74)', alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, alignItems: 'flex-end' },
  title: { color: COLORS.gray900, fontSize: FONT_SIZES.md, fontWeight: '900' },
  text: { color: COLORS.gray500, fontSize: FONT_SIZES.sm, marginTop: SPACING.xs, textAlign: 'right' },
});

