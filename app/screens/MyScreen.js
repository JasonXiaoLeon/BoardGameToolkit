import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const MyScreen = () => {
  const [likedGamesVisible, setLikedGamesVisible] = useState(false); // 控制"我喜欢的桌游"区域的显示与隐藏

  // 模拟数据
  const myGames = [
    { id: '1', title: '我喜欢的桌游' },
    { id: '2', title: '我收藏的桌游' },
    { id: '3', title: '我玩过的桌游' },
  ];

  // 喜欢的桌游
  const likedGames = [
    { id: '1', title: '方舟动物园', cover: require('../../assets/images/arknovabg.webp') }, // 本地图片
    { id: '2', title: '王国制图师', cover: require('../../assets/images/Cartographersbg.jpeg') }, // 本地图片
    { id: '3', title: '阿纳克遗迹', cover: require('../../assets/images/arnakbg.webp') },
    { id: '4', title: '茂林源记', cover: require('../../assets/images/rootbg.webp') },
    { id: '5', title: '奥地利大饭店', cover: require('../../assets/images/GrandAustriaHotelbg.webp') },
  ];

  const handlePressLikedGames = () => {
    setLikedGamesVisible(!likedGamesVisible); // 点击时切换显示与隐藏
  };

  const renderGameItem = ({ item }) => {
    // 如果是加号，则返回加号元素
    if (item.title === '') {
      return (
        <TouchableOpacity style={styles.addGameItem}>
          <View style={styles.addGameCover}>
            <Text style={styles.addGameText}>+</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.gameItem}>
        <Image source={item.cover} style={styles.gameCover} />
        <Text style={styles.gameTitle}>{item.title}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    if (item.title === '我喜欢的桌游') {
      return (
        <View>
          <TouchableOpacity style={styles.itemContainer} onPress={handlePressLikedGames}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
          {likedGamesVisible && (
            <FlatList
              data={[...likedGames, { id: (likedGames.length + 1).toString(), title: '' }]} // 动态生成加号项
              renderItem={renderGameItem}
              keyExtractor={(item) => item.id}
              numColumns={3} // 每行显示3个
              contentContainerStyle={styles.gameList}
            />
          )}
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myGames}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  gameList: {
    paddingVertical: 10,
    flexDirection: 'row', // 使用行方向布局
    flexWrap: 'wrap', // 自动换行
  },
  gameItem: {
    flex: 1,
    margin: 5,
    position: 'relative',
    maxWidth: '33.33%', // 设置最大宽度为1/3
  },
  gameCover: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    aspectRatio: 5 / 6,
  },
  gameTitle: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
  },
  addGameItem: {
    flex: 1,
    margin: 5,
    maxWidth: '33.33%', // 设置最大宽度为1/3
    alignItems: 'center', // 水平居中
  },
  addGameCover: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  addGameText: {
    fontSize: 30,
    color: '#333',
  },
});

export default MyScreen;
