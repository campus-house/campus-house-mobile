import * as React from "react";
import {StyleSheet, View} from "react-native";

const Vector123 = () => {
  return (
    <View style={styles.vectorIcon} />
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    flex: 1,
    height: 314,
    backgroundColor: "#fff0c7"
  }
});

export default Vector123;
