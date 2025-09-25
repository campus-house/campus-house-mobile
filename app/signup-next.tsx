import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';

export default function SignupNextScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>다음 화면</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/write')}>
        <Text style={styles.buttonText}>다음으로</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 48,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: 16,
    fontWeight: '700',
  },
});
