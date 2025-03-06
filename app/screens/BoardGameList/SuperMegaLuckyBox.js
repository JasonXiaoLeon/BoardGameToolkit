import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import BoardGameProps from '../../../Components/BoardGameProps/BoardGameProps';
import GameBtn from '../../../Components/BoardGames/GameBtn';

const { width } = Dimensions.get('window');

const SuperMegaLuckyBox = () => {
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
          source={require('../../../assets/images/SuperMegaLuckyBoxBg.webp')}
          style={[styles.image, { height: imageHeight }]} // 使用动态计算的高度
        />
        <Image 
          source={require('../../../assets/images/SuperMegaLuckyBox.png')}
          style={styles.imageTitle}
        />
      </View>
      <BoardGameProps 
        playerCount="1-6 人（最佳 4-5人）" 
        gameDuration="20分钟" 
        gameWeight="1.22 / 5" 
        age="8+"
        gameRank="总榜 1352"
      />
       <GameBtn gameScreen="SuperMegaLuckyBoxGameScreen" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
    },
    imageContainer: {
      width: width,
      alignItems: 'center',
    },
    image: {
      width: width,
      resizeMode: 'contain',
      opacity: 0.8,
    },
    imageTitle: {
      width: width,
      height: 140,
      resizeMode: 'contain',
      opacity: 0.8,
    },
  });
  
export default SuperMegaLuckyBox;
