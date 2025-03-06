// app/screens/BoardGameList/BoardGameProps.js
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const BoardGameProps = ({ playerCount, gameDuration, gameWeight, age, gameRank }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.row}>
        <Text style={styles.cellTitle}>游戏人数</Text>
        <Text style={styles.cell}>{playerCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cellTitle}>游戏时长</Text>
        <Text style={styles.cell}>{gameDuration}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cellTitle}>游戏重度</Text>
        <Text style={styles.cell}>{gameWeight}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cellTitle}>年龄</Text>
        <Text style={styles.cell}>{age}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cellTitle}>排名</Text>
        <Text style={styles.cell}>{gameRank}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '90%',  // 设置 ScrollView 的宽度
  },
  row: {
    flexDirection: 'row', // 创建一行
    justifyContent: 'space-between', // 两侧对齐
    paddingVertical: 15, // 行的内边距
    marginVertical: 10, // 行的外边距
    borderBottomWidth: 1, // 行之间的下边框
    borderBottomColor: '#ddd', // 边框颜色
  },
  cellTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  cell: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right', // 右对齐
    color: '#4B8B3B',
  },
});

export default BoardGameProps;
