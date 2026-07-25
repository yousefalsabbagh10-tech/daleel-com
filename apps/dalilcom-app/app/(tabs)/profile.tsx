import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeIcon } from '../../components/common/NativeIcon';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

export default function ProfileTab() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>حسابي</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <NativeIcon name="person-outline" size={48} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>زائر</Text>
        <Text style={styles.subtitle}>سجل دخول للوصول إلى جميع المزايا</Text>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>تسجيل الدخول</Text>
        </TouchableOpacity>
        <View style={styles.menu}>
          {[
            { icon: 'heart-outline', label: 'المفضلة' },
            { icon: 'star-outline', label: 'إعلاناتي' },
            { icon: 'notifications-outline', label: 'الإشعارات' },
            { icon: 'call-outline', label: 'اتصل بنا' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <NativeIcon name={item.icon} size={20} color={COLORS.gray600} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: { backgroundColor: COLORS.primary, paddingTop: 52, paddingHorizontal: SPACING.xl, paddingBottom: SPACING.lg, borderBottomLeftRadius: BORDER_RADIUS.xxl, borderBottomRightRadius: BORDER_RADIUS.xxl },
  headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: '800', color: COLORS.white },
  content: { alignItems: 'center', paddingTop: SPACING.xl, paddingHorizontal: SPACING.lg },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  name: { fontSize: FONT_SIZES.xl, fontWeight: '700', color: COLORS.gray900 },
  subtitle: { fontSize: FONT_SIZES.sm, color: COLORS.gray500, marginTop: SPACING.xs, marginBottom: SPACING.lg },
  loginBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.full, marginBottom: SPACING.xl },
  loginText: { color: COLORS.white, fontWeight: '600', fontSize: FONT_SIZES.md },
  menu: { width: '100%', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  menuLabel: { fontSize: FONT_SIZES.md, color: COLORS.gray900, fontWeight: '500' },
});
