import * as React from "react";
import {View, StyleSheet, Animated} from "react-native";

const SparkleEffects: React.FC = () => {
  const [animation] = React.useState(new Animated.Value(0));

  // 반짝이는 효과 끄기 - 고정 투명도 사용
  const opacity = 1;

  return (
    <View style={styles.container}>
      {/* Stars */}
      <Animated.View style={[styles.star1, { opacity }]} />
      <Animated.View style={[styles.star2, { opacity }]} />
      <Animated.View style={[styles.star3, { opacity }]} />
      <Animated.View style={[styles.star4, { opacity }]} />
      <Animated.View style={[styles.star5, { opacity }]} />
      <Animated.View style={[styles.star6, { opacity }]} />
      
      {/* Rectangles */}
      <Animated.View style={[styles.rectangle1, { opacity }]} />
      <Animated.View style={[styles.rectangle2, { opacity }]} />
      <Animated.View style={[styles.rectangle3, { opacity }]} />
      <Animated.View style={[styles.rectangle4, { opacity }]} />
      <Animated.View style={[styles.rectangle5, { opacity }]} />
      <Animated.View style={[styles.rectangle6, { opacity }]} />
      <Animated.View style={[styles.rectangle7, { opacity }]} />
      <Animated.View style={[styles.rectangle8, { opacity }]} />
      <Animated.View style={[styles.rectangle9, { opacity }]} />
      <Animated.View style={[styles.rectangle10, { opacity }]} />
      <Animated.View style={[styles.rectangle11, { opacity }]} />
      <Animated.View style={[styles.rectangle12, { opacity }]} />
      
      {/* Ellipses */}
      <Animated.View style={[styles.ellipse1, { opacity }]} />
      <Animated.View style={[styles.ellipse2, { opacity }]} />
      <Animated.View style={[styles.ellipse3, { opacity }]} />
      <Animated.View style={[styles.ellipse4, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // Stars - 더 넓게 배치
  star1: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: 20,
    height: 20,
    backgroundColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
  },
  star2: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: 15,
    height: 15,
    backgroundColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
  },
  star3: {
    position: 'absolute',
    top: '40%',
    left: '5%',
    width: 12,
    height: 12,
    backgroundColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
  },
  star4: {
    position: 'absolute',
    top: '35%',
    right: '8%',
    width: 18,
    height: 18,
    backgroundColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
  },
  star5: {
    position: 'absolute',
    top: '60%',
    left: '20%',
    width: 14,
    height: 14,
    backgroundColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
  },
  star6: {
    position: 'absolute',
    top: '70%',
    right: '25%',
    width: 16,
    height: 16,
    backgroundColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
  },
  // Rectangles - 더 많이 추가
  rectangle1: {
    position: 'absolute',
    top: '20%',
    left: '25%',
    width: 8,
    height: 12,
    backgroundColor: '#FF6B6B',
  },
  rectangle2: {
    position: 'absolute',
    top: '45%',
    right: '20%',
    width: 6,
    height: 10,
    backgroundColor: '#4ECDC4',
  },
  rectangle3: {
    position: 'absolute',
    top: '65%',
    left: '15%',
    width: 10,
    height: 8,
    backgroundColor: '#45B7D1',
  },
  rectangle4: {
    position: 'absolute',
    top: '30%',
    right: '5%',
    width: 7,
    height: 9,
    backgroundColor: '#FF9F43',
  },
  rectangle5: {
    position: 'absolute',
    top: '55%',
    left: '8%',
    width: 9,
    height: 6,
    backgroundColor: '#6C5CE7',
  },
  rectangle6: {
    position: 'absolute',
    top: '10%',
    left: '40%',
    width: 8,
    height: 11,
    backgroundColor: '#FF6B6B',
  },
  rectangle7: {
    position: 'absolute',
    top: '35%',
    right: '35%',
    width: 6,
    height: 9,
    backgroundColor: '#4ECDC4',
  },
  rectangle8: {
    position: 'absolute',
    top: '60%',
    left: '35%',
    width: 10,
    height: 7,
    backgroundColor: '#45B7D1',
  },
  rectangle9: {
    position: 'absolute',
    top: '25%',
    right: '45%',
    width: 7,
    height: 8,
    backgroundColor: '#FF9F43',
  },
  rectangle10: {
    position: 'absolute',
    top: '50%',
    left: '45%',
    width: 9,
    height: 5,
    backgroundColor: '#6C5CE7',
  },
  rectangle11: {
    position: 'absolute',
    top: '75%',
    right: '30%',
    width: 8,
    height: 10,
    backgroundColor: '#FF6B6B',
  },
  rectangle12: {
    position: 'absolute',
    top: '80%',
    left: '25%',
    width: 6,
    height: 8,
    backgroundColor: '#4ECDC4',
  },
  // Ellipses - 더 넓게 배치
  ellipse1: {
    position: 'absolute',
    top: '25%',
    right: '10%',
    width: 16,
    height: 8,
    backgroundColor: '#96CEB4',
    borderRadius: 8,
  },
  ellipse2: {
    position: 'absolute',
    top: '50%',
    left: '12%',
    width: 12,
    height: 6,
    backgroundColor: '#FFEAA7',
    borderRadius: 6,
  },
  ellipse3: {
    position: 'absolute',
    top: '75%',
    right: '15%',
    width: 14,
    height: 7,
    backgroundColor: '#FD79A8',
    borderRadius: 7,
  },
  ellipse4: {
    position: 'absolute',
    top: '80%',
    left: '30%',
    width: 10,
    height: 5,
    backgroundColor: '#00B894',
    borderRadius: 5,
  },
});

export default SparkleEffects;
