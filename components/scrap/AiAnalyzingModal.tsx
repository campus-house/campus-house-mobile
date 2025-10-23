import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, StatusBar, Image, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface AiAnalyzingModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AiAnalyzingModal({ visible, onClose }: AiAnalyzingModalProps) {
  // 점 애니메이션
  const dot1Opacity = useRef(new Animated.Value(1)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  // 점 애니메이션 효과
  useEffect(() => {
    if (visible) {
      const animateDots = () => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(dot1Opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(dot2Opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
            Animated.timing(dot3Opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(dot1Opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
            Animated.timing(dot2Opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(dot3Opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(dot1Opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
            Animated.timing(dot2Opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
            Animated.timing(dot3Opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          ]),
        ]).start(() => animateDots());
      };
      animateDots();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* 분석중 텍스트 */}
        <View style={styles.analyzingContainer}>
          <Text style={styles.analyzingText}>분석 중</Text>
          <View style={styles.dotsContainer}>
            <Animated.View style={{ opacity: dot1Opacity }}>
              <Svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                <Circle cx="2" cy="2" r="1.57258" fill="#FF805F" />
              </Svg>
            </Animated.View>
            <Animated.View style={{ opacity: dot2Opacity, marginLeft: 4 }}>
              <Svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                <Circle cx="2" cy="2" r="1.57258" fill="#FF805F" />
              </Svg>
            </Animated.View>
            <Animated.View style={{ opacity: dot3Opacity, marginLeft: 4 }}>
              <Svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                <Circle cx="2" cy="2" r="1.57258" fill="#FF805F" />
              </Svg>
            </Animated.View>
          </View>
        </View>

        {/* 메인 텍스트 */}
        <Text style={styles.mainText}>미오님이 좋아하실만한{'\n'}집을 추천해드릴게요!</Text>

        {/* 고슴도치 이미지 */}
        <Image
          source={require('@/assets/images/hedgehog-scrap1.png')}
          style={styles.hedgehogImage}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 240,
  },
  analyzingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  analyzingText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FF805F',
    fontFamily: 'Pretendard',
    lineHeight: 24,
    marginRight: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#323232',
    fontFamily: 'Pretendard',
    lineHeight: 31,
    textAlign: 'center',
    marginBottom: 60,
  },
  hedgehogImage: {
    width: '110%',
    height: 330,
    position: 'absolute',
    bottom: 35,
  },
});

