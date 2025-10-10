import * as React from "react";
import {StyleSheet, Pressable, Image} from "react-native";

interface HeartButtonProps {
  onPress?: () => void;
}

const HeartButton: React.FC<HeartButtonProps> = ({ onPress }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePress = () => {
    console.log('하트 버튼 클릭됨, 현재 상태:', isPressed);
    setIsPressed(!isPressed);
    console.log('하트 버튼 상태 변경됨, 새로운 상태:', !isPressed);
    onPress?.();
  };

  // 이미지 소스를 미리 정의
  const heartImage = require('@/assets/images/heartbutton.png');
  const heartRedImage = require('@/assets/images/heartbuttonred.png');

  return (
    <Pressable style={styles.union} onPress={handlePress}>
      {isPressed ? (
        <Image 
          source={heartRedImage} 
          style={styles.icon} 
          resizeMode="contain" 
        />
      ) : (
        <Image 
          source={heartImage} 
          style={styles.icon} 
          resizeMode="contain" 
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  union: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  icon: {
    height: 25,
    width: 25,
    backgroundColor: 'transparent'
  }
});

export default HeartButton;
