import * as React from "react";
import {StyleSheet, View} from "react-native";

const Vector119 = () => {
  return (
    <View style={styles.container}>
      {/* 울퉁불퉁한 들판을 여러 개의 View로 구성 */}
      <View style={styles.grassSection1} />
      <View style={styles.grassSection2} />
      <View style={styles.grassSection3} />
      <View style={styles.grassSection4} />
      <View style={styles.grassSection5} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#4ba2ff', // 파란색 배경으로 흰 부분 채우기
  },
  grassSection1: {
    flex: 1,
    backgroundColor: '#86D382', // 연한 녹색
    borderTopLeftRadius: 20,
    borderTopRightRadius: 15,
    marginRight: -5,
  },
  grassSection2: {
    flex: 1,
    backgroundColor: '#86D382', // 연한 녹색
    borderTopLeftRadius: 10,
    borderTopRightRadius: 25,
    marginRight: -5,
  },
  grassSection3: {
    flex: 1,
    backgroundColor: '#86D382', // 연한 녹색
    borderTopLeftRadius: 30,
    borderTopRightRadius: 5,
    marginRight: -5,
  },
  grassSection4: {
    flex: 1,
    backgroundColor: '#86D382', // 연한 녹색
    borderTopLeftRadius: 15,
    borderTopRightRadius: 20,
    marginRight: -5,
  },
  grassSection5: {
    flex: 1,
    backgroundColor: '#86D382', // 연한 녹색
    borderTopLeftRadius: 25,
    borderTopRightRadius: 10,
  },
});

export default Vector119;
