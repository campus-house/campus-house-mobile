import * as React from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";

interface RewardButtonProps {
  onPress?: () => void;
}

const RewardButton: React.FC<RewardButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.c}>800C 받기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff805f",
    width: "100%",
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 140
  },
  c: {
    width: 109,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#fff",
    textAlign: "center",
    height: 31
  }
});

export default RewardButton;
