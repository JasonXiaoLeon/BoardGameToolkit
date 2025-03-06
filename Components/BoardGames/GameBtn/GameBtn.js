import React from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GameBtn = ({ gameScreen }) => {
  const navigation = useNavigation();

  // 定义 StartGame 函数
  const StartGame = () => {
    // 使用路由参数导航到指定屏幕
    navigation.navigate(gameScreen); 
  };

  const instruction = () => {
    Alert.alert("说明书");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonleft} onPress={instruction}>
        <Text style={styles.buttonText}>说明书</Text>
      </TouchableOpacity>
      <View style={styles.spacer} /> 
      <TouchableOpacity style={styles.buttonright} onPress={StartGame}>
        <Text style={styles.buttonText}>发牌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 设置为行布局
    justifyContent: 'space-between', // 在按钮之间留出空间
    alignItems: 'center', // 垂直居中
    padding: 10
  },
  buttonleft: {
    backgroundColor: '#007bff', // 按钮背景色
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 5,
    flex: 1, // 使按钮均分可用空间
    marginRight: 10, // 可选: 为左侧按钮添加右边距
    alignItems: 'center'
  },
  spacer: {
    flex: 1, // 空白区域占据中间 1 份
  },
  buttonright: {
    backgroundColor: '#007bff', // 按钮背景色
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 5,
    flex: 1, // 使按钮均分可用空间
    marginLeft: 10, // 可选: 为右侧按钮添加左边距
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // 白色字体
    fontWeight: 'bold',
  },
});

export default GameBtn;
