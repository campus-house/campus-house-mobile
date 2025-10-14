import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ComposerScreen() {
  return (
    <View style={styles.parent}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }} />
      {/* Center big raccoon with bubble */}
      <View style={styles.centerWrap} pointerEvents="none">
        <Image
          source={require('@/assets/images/racoon-real.png')}
          style={{ width: 220, height: 220, marginBottom: 40 }}
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/images/speechbubble.png')}
          style={{ position: 'absolute', width: 170, height: 100, top: '30%' }}
          resizeMode="contain"
        />
        <Text style={styles.overlayBubbleText}>{`어떤 생각을\n하고 있나요?`}</Text>
      </View>
      <SafeAreaView style={styles.viewBg}>
        <View style={[styles.view, styles.viewBg]} />
        <View style={styles.inputRow}>
          <View style={styles.greenCircle}>
            <Image
              source={require('@/assets/images/racoon-real.png')}
              style={{ width: 51, height: 51 }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.inputPlaceholder}>어떤 생각을 하고 있나요?</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.doneText}>완료</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: { flex: 1, backgroundColor: '#fff' },
  viewBg: { backgroundColor: '#fff', flex: 1 },
  view: { width: '100%', height: 65 },
  inputRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  greenCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#86d382',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  inputPlaceholder: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Pretendard',
    color: '#aaa',
  },
  doneText: {
    width: 32,
    height: 22,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'left',
  },
  centerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBubbleText: {
    position: 'absolute',
    top: '33%',
    width: 164,
    height: 52,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    color: '#636363',
    textAlign: 'center',
  },
});
