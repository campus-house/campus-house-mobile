import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';

interface NameInputFieldProps {
  isSelected?: boolean;
}

export const NameInputField: React.FC<NameInputFieldProps> = ({
  isSelected: initialIsSelected = false,
}) => {
  const [isSelected, setIsSelected] = useState(initialIsSelected);
  const [inputText, setInputText] = useState('');

  const handlePress = () => {
    setIsSelected(true);
  };

  const handleKeyPress = (key: string) => {
    if (isSelected) {
      setInputText((prev) => prev + key);
    }
  };

  const handleDelete = () => {
    if (isSelected && inputText.length > 0) {
      setInputText((prev) => prev.slice(0, -1));
    }
  };

  return (
    <View style={styles.container}>
      {/* 입력 필드 영역 */}
      <TouchableOpacity style={styles.inputContainer} onPress={handlePress}>
        {/* 이름 라벨 */}
        <Text style={styles.label}>이름</Text>

        {/* 입력 텍스트 또는 플레이스홀더 */}
        {isSelected ? (
          <Text style={styles.inputText}>{inputText}</Text>
        ) : (
          <Text style={styles.placeholder}>이름 입력</Text>
        )}

        {/* 하단 선 */}
        <View
          style={[
            styles.bottomLine,
            { backgroundColor: isSelected ? COLORS.neutral.black : COLORS.neutral.grey3 },
          ]}
        />
      </TouchableOpacity>

      {/* 테스트용 키보드 */}
      {isSelected && (
        <View style={styles.testKeyboard}>
          <View style={styles.keyRow}>
            {['김', '이', '박', '최', '정'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.testKey}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.testKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keyRow}>
            {['영', '수', '민', '지', '현'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.testKey}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.testKeyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.deleteKey} onPress={handleDelete}>
            <Text style={styles.deleteKeyText}>삭제</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: COLORS.neutral.grey4,
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
    color: COLORS.neutral.grey3,
    fontFamily: 'Pretendard',
    fontSize: 18.5,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.519,
    textAlign: 'center',
    marginBottom: 8,
  },
  inputText: {
    width: 300.934,
    color: COLORS.neutral.black,
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
  },
  testKeyboard: {
    marginTop: 20,
  },
  keyRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  testKey: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.neutral.grey2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  testKeyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteKey: {
    width: 80,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  deleteKeyText: {
    color: COLORS.text.inverse,
    fontSize: 14,
    fontWeight: '600',
  },
});
