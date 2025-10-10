import * as React from "react";
import {Text, StyleSheet} from "react-native";

const RewardTitleText: React.FC = () => {
  return (
    <Text style={styles.text}>{`이웃에게 처음으로
하트를 줬어요!`}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    width: 215,
    fontSize: 30,
    lineHeight: 39,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#fff",
    textAlign: "center"
  }
});

export default RewardTitleText;
