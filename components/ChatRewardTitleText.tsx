import * as React from "react";
import {Text, StyleSheet} from "react-native";

interface Props { text?: string }
const ChatRewardTitleText: React.FC<Props> = ({ text }) => {
  return (
    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{text ?? `이웃과 처음으로 대화했어요!`}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    maxWidth: '90%',
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "600",
    fontFamily: "Pretendard",
    color: "#fcfcfc",
    textAlign: "center",
    flexWrap: 'nowrap'
  }
});

export default ChatRewardTitleText;
