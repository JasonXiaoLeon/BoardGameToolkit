import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';

const RotatingPickerScreen = () => {
  const players = ['玩家一', '玩家二', '玩家三'];
  const totalOptions = players.length; // 总选项数量为3
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    let interval;
    if (isSpinning) {
      interval = setInterval(() => {
        setSelectedIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % totalOptions; // 每次向下移动，循环选择
          return nextIndex;
        });
      }, 200); // 每200毫秒转动一次

      // 停止转动
      setTimeout(() => {
        clearInterval(interval);
        setIsSpinning(false);
      }, 3000); // 转动3秒后停止
    }

    return () => {
      clearInterval(interval);
    };
  }, [isSpinning]);

  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedIndex; // 判断当前项是否被选中
    return (
      <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
        <Text style={[styles.itemText, isSelected && styles.selectedText]}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>选择玩家</Text>
      <FlatList
        data={players} // 使用3个玩家选项
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={3}
        scrollEnabled={false} // 禁用滚动
      />
      <Button
        title="开始转动"
        onPress={() => {
          // 随机生成一个索引作为初始选中项
          const randomIndex = Math.floor(Math.random() * totalOptions);
          setSelectedIndex(randomIndex); // 每次开始时随机选择索引
          setIsSpinning(true);
        }}
        color="#007BFF" // 按钮颜色
        accessibilityLabel="开始转动" // 可访问性标签
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // 背景颜色
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // 标题颜色
  },
  itemContainer: {
    width: 120, // 设置宽度
    height: 120, // 设置高度
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 60, // 设置为一半的值以确保是圆形
    backgroundColor: '#ffffff', // 选项背景颜色
    borderWidth: 2,
    borderColor: '#007BFF', // 边框颜色
    shadowColor: '#000', // 阴影颜色
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android 阴影效果
  },
  itemText: {
    fontSize: 18,
    color: '#555', // 选项文本颜色
  },
  selectedItem: {
    backgroundColor: '#cceeff', // 选中项的背景颜色
  },
  selectedText: {
    color: '#007BFF', // 选中项的文本颜色
    fontWeight: 'bold', // 选中项文本加粗
  },
});

export default RotatingPickerScreen;
