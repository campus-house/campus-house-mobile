import * as React from "react";
import {Text, StyleSheet} from "react-native";

const ChatRewardTitleText: React.FC = () => {
  return (
    <Text style={styles.text}>{`이웃과 처음으로
대화했어요!`}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    width: 215,
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#fcfcfc",
    textAlign: "center"
  }
});

export default ChatRewardTitleText;
