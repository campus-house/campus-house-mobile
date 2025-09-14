import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

export default function ScrapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>스크랩 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: COLORS.text.primary,
  },
});
