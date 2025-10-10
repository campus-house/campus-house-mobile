import * as React from "react";
import {StyleSheet, Image} from "react-native";

const Vector119 = () => {
  return (
    <Image 
      source={require('@/assets/images/grass.png')} 
      style={styles.vectorIcon} 
      resizeMode="contain" 
    />
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    flex: 1,
    height: 800
  }
});

export default Vector119;