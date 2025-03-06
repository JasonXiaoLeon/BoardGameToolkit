import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import BoardGameProps from '../../../Components/BoardGameProps/BoardGameProps';
import CartographersGame from '../../../Components/BoardGames/GameBtn';


const { width } = Dimensions.get('window');

const LostRuinsOfArnak = () => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    // 假设您的图片宽高比为 4:3
    const aspectRatio = 4 / 3;
    const height = width / aspectRatio; // 根据宽度计算高度
    setImageHeight(height);
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/arnakbg.webp')}
          style={[styles.image, { height: imageHeight }]} // 使用动态计算的高度
        />
        <Image 
          source={require('../../../assets/images/arnak.png')}
          style={styles.imageTitle}
        />
      </View>
      <BoardGameProps 
        playerCount="1-4 人（最佳 3人）" 
        gameDuration="30-120 分钟" 
        gameWeight="2.92 / 5" 
        age="12+"
        gameRank="总榜 28"
      />
       <CartographersGame/>
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

export default LostRuinsOfArnak;
