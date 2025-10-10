import * as React from "react";
import {Text, StyleSheet} from "react-native";

interface AttachmentOptionTextProps {
  text: string;
  style?: any;
}

const AttachmentOptionText: React.FC<AttachmentOptionTextProps> = ({ text, style }) => {
  return (
    <Text style={[styles.text, style]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    width: 32,
    fontSize: 12,
    lineHeight: 22,
    fontFamily: "Pretendard",
    color: "#323232",
    textAlign: "left"
  }
});

export default AttachmentOptionText;
