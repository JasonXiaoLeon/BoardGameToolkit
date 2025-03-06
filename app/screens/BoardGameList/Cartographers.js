import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import BoardGameProps from '../../../Components/BoardGameProps/BoardGameProps';
import GameBtn from '../../../Components/BoardGames/GameBtn';

const { width } = Dimensions.get('window');

const Cartographers = () => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const aspectRatio = 4 / 3;
    const height = width / aspectRatio; // 根据宽度计算高度
    setImageHeight(height);
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    >
      <View>
        <Image 
          source={require('../../../assets/images/Cartographersbg.jpeg')}
          style={[styles.image, { height: imageHeight }]} // 使用动态计算的高度
        />
        <Image 
          source={require('../../../assets/images/Cartographers.png')}
          style={styles.imageTitle}
        />
      </View>
      <BoardGameProps 
        playerCount="1-4 人（最佳 3-4人）" 
        gameDuration="30-45 分钟" 
        gameWeight="1.88 / 5" 
        age="10+"
        gameRank="总榜 154"
      />
      {/* 传递路由参数 "CartographersGameScreen" 给 GameBtn */}
      <GameBtn gameScreen="CartographersGameScreen" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // 允许 ScrollView 内容自适应高度
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: width,
    resizeMode: 'contain',
    opacity: 0.8,
  },
  imageTitle: {
    width: width,
    height: 80,
    resizeMode: 'contain',
    opacity: 0.8,
  },
});

export default Cartographers;
