import * as React from "react";
import {Text, StyleSheet} from "react-native";

const FeedbackText: React.FC = () => {
  return (
    <Text style={styles.text}>{`라쿤인데요님과의 대화가
즐거우셨다면 하트를 남겨주세요!`}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    width: 193,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: "Pretendard",
    color: "#636363",
    textAlign: "center",
    marginLeft: 25
  }
});

export default FeedbackText;
