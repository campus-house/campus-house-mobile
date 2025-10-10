import * as React from "react";
import {Image, StyleSheet} from "react-native";

const SquirrelImage: React.FC = () => {
  return (
    <Image 
      source={require('@/assets/images/star_squirrel.png')} 
      style={styles.image169Icon} 
      resizeMode="contain" 
    />
  );
};

const styles = StyleSheet.create({
  image169Icon: {
    width: 246,
    height: 246,
    maxWidth: "100%",
    overflow: "hidden",
  }
});

export default SquirrelImage;
