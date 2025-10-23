import * as React from "react";
import {StyleSheet, View} from "react-native";

const Vector123 = () => {
  return (
    <View style={styles.vectorIcon}>
      {/* 경계선 추가 */}
      <View style={styles.borderLine} />
    </View>
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
  },
  borderLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#FFE19066',
    zIndex: 50,
  }
});

export default Vector123;
