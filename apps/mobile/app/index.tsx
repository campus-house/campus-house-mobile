import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {' '}
      <Text style={styles.title}>Campus House</Text>{' '}
      <Text style={styles.subtitle}>캠퍼스 라이프를 더 스마트하게</Text>{' '}
      <View style={styles.buttonContainer}>
        {' '}
        <Link href="/profile" asChild>
          {' '}
          <TouchableOpacity style={styles.button}>
            {' '}
            <Text style={styles.buttonText}>프로필 보기</Text>{' '}
          </TouchableOpacity>{' '}
        </Link>{' '}
        <Link href="/settings" asChild>
          {' '}
          <TouchableOpacity style={styles.button}>
            {' '}
            <Text style={styles.buttonText}>설정</Text>{' '}
          </TouchableOpacity>{' '}
        </Link>{' '}
      </View>{' '}
    </View>
  );
}
const styles = StyleSheet.create({
  button: { alignItems: 'center', backgroundColor: '#007AFF', borderRadius: 10, padding: 15 },
  buttonContainer: { gap: 15, width: '100%' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: { color: '#666', fontSize: 16, marginBottom: 40, textAlign: 'center' },
  title: { color: '#333', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
});