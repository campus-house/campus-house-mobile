import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NameInputFieldProps {
  isSelected?: boolean;
}

export const NameInputField: React.FC<NameInputFieldProps> = ({
  isSelected = false,
}) => {
  return (
    <View style={styles.container}>
      {/* 입력란 선택시 텍스트 */}
      <Text style={styles.title}>입력란 선택시</Text>
      
      {/* 입력 필드 영역 */}
      <View style={styles.inputContainer}>
        {/* 이름 라벨 */}
        <Text style={styles.label}>이름</Text>
        
        {/* 하단 회색 선 */}
        <View style={styles.bottomLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    color: '#3F3A2F',
    fontFamily: 'Pretendard',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#AAA',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 4,
  },
  placeholder: {
    width: 300.934,
    color: '#CDCDCD',
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomLine: {
    width: 308,
    height: 1.5,
    backgroundColor: '#323232',
  },
});
