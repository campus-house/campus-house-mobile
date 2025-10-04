import * as React from "react";
import {Text, StyleSheet} from "react-native";

const RewardSubText: React.FC = () => {
  return (
    <Text style={styles.text}>보급된 리워드로 캐릭터를 구매해보세요</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    width: 232,
    fontSize: 15,
    lineHeight: 25,
    fontWeight: "500",
    fontFamily: "Pretendard",
    color: "#fcfcfc",
    textAlign: "center",
    marginTop: 30
  }
});

export default RewardSubText;
