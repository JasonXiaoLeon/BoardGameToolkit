import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

// 定义图片资源，包含每张图片的 round 参数
const images = [
  { source: require('../../../../assets/images/cartographers/01.jpg'), round: 0 },
  { source: require('../../../../assets/images/cartographers/02.jpg'), round: 0 },
  { source: require('../../../../assets/images/cartographers/03.jpg'), round: 0 },
  { source: require('../../../../assets/images/cartographers/04.jpg'), round: 0 },
  { source: require('../../../../assets/images/cartographers/05.jpg'), round: 0 },
  { source: require('../../../../assets/images/cartographers/06.jpg'), round: 0 },
  { source: require('../../../../assets/images/cartographers/07.jpg'), round: 1 },
  { source: require('../../../../assets/images/cartographers/08.jpg'), round: 1 },
  { source: require('../../../../assets/images/cartographers/09.jpg'), round: 1 },
  { source: require('../../../../assets/images/cartographers/10.jpg'), round: 1 },
  { source: require('../../../../assets/images/cartographers/11.jpg'), round: 2 },
  { source: require('../../../../assets/images/cartographers/12.jpg'), round: 2 },
  { source: require('../../../../assets/images/cartographers/13.jpg'), round: 2 },
  { source: require('../../../../assets/images/cartographers/14.jpg'), round: 2 },
  { source: require('../../../../assets/images/cartographers/15.jpg'), round: 2 },
  { source: require('../../../../assets/images/cartographers/16.jpg'), round: 2 },
  { source: require('../../../../assets/images/cartographers/17.jpg'), round: 0 },
];

// 定义奖励卡图片资源
const rewardCards = [
  require('../../../../assets/images/cartographers/bonus/26.jpg'),
  require('../../../../assets/images/cartographers/bonus/27.jpg'),
  require('../../../../assets/images/cartographers/bonus/28.jpg'),
  require('../../../../assets/images/cartographers/bonus/29.jpg'),
  require('../../../../assets/images/cartographers/bonus/30.jpg'),
  require('../../../../assets/images/cartographers/bonus/31.jpg'),
  require('../../../../assets/images/cartographers/bonus/32.jpg'),
  require('../../../../assets/images/cartographers/bonus/33.jpg'),
  require('../../../../assets/images/cartographers/bonus/34.jpg'),
  require('../../../../assets/images/cartographers/bonus/35.jpg'),
  require('../../../../assets/images/cartographers/bonus/36.jpg'),
  require('../../../../assets/images/cartographers/bonus/37.jpg'),
  require('../../../../assets/images/cartographers/bonus/38.jpg'),
  require('../../../../assets/images/cartographers/bonus/39.jpg'),
  require('../../../../assets/images/cartographers/bonus/40.jpg'),
  require('../../../../assets/images/cartographers/bonus/41.jpg'),
];

export default class CartographersGameScreen extends Component {
  state = {
    currentSeason: '春季', // 初始季节
    currentRound: 0, // 当前轮数
    currentImage: null, // 当前图片
    shownImages: [], // 存储已显示的图片
    rewards: [], // 存储当前季节的奖励卡
    generatedRewards: [], // 随机生成的奖励卡
  };

  // 季节对应的下一个季节和奖励卡索引
  seasons = ['春季', '夏季', '秋季', '冬季'];

  componentDidMount() {
    this.setState({ generatedRewards: this.getRandomRewards() }, this.updateRewards); // 初始化奖励卡
  }

  // 随机选择奖励卡并确保不重复
  getRandomRewards = () => {
    const shuffledRewards = rewardCards.sort(() => 0.5 - Math.random()); // 打乱奖励卡数组
    return shuffledRewards.slice(0, 4); // 取前4张作为随机奖励卡
  };

  // 根据当前季节更新奖励卡
  updateRewards = () => {
    const { currentSeason, generatedRewards } = this.state;
    let rewardsToShow;

    switch (currentSeason) {
      case '春季':
        rewardsToShow = [generatedRewards[0], generatedRewards[1]];
        break;
      case '夏季':
        rewardsToShow = [generatedRewards[1], generatedRewards[2]];
        break;
      case '秋季':
        rewardsToShow = [generatedRewards[2], generatedRewards[3]];
        break;
      case '冬季':
        rewardsToShow = [generatedRewards[3], generatedRewards[0]];
        break;
      default:
        rewardsToShow = [];
    }

    this.setState({ rewards: rewardsToShow });
  };

  // 检查轮数并更新季节
  checkSeason = () => {
    if (this.state.currentRound >= 8) {
      this.setState({ isNextSeasonChange: true }); // 设置下次点击时切换季节
    }
  };

  // 随机选择图片并增加轮数
  randomizeImageAndRound = () => {
    // 从未显示过的图片中随机选择一张
    let availableImages = images.filter((img) => !this.state.shownImages.includes(img.source));

    if (availableImages.length === 0) {
      // 如果所有图片都已显示过，则重置 shownImages
      this.setState({ shownImages: [] });
      availableImages = images; // 重新赋值可用图片
    }

    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];

    this.setState((prevState) => ({
      currentImage: selectedImage.source,
      currentRound: prevState.currentRound + selectedImage.round, // 每次点击增加轮数
      shownImages: [...prevState.shownImages, selectedImage.source], // 更新已显示图片列表
    }), () => {
      this.checkSeason(); // 增加轮数后检查季节

      // 如果标记为下次切换季节，则执行切换逻辑
      if (this.state.isNextSeasonChange) {
        this.setState((prevState) => {
          const nextSeasonIndex = (this.seasons.indexOf(prevState.currentSeason) + 1) % this.seasons.length;
          return {
            currentSeason: this.seasons[nextSeasonIndex],
            currentRound: 0, // 重置轮数
            isNextSeasonChange: false, // 重置标记
            // rewards: this.getRandomRewards(), // 不再重新生成奖励卡
          };
        }, this.updateRewards); // 更新奖励卡
      }
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>王国制图师</Text>
        </View>
        <View style={styles.seasonContainer}>
          <Text style={styles.seasonText}>当前季节: {this.state.currentSeason}</Text>
          <Text style={styles.roundText}>当前轮数: {this.state.currentRound}/8</Text>
        </View>
        <View style={styles.imageContainer}>
          {this.state.currentImage && (
            <Image source={this.state.currentImage} style={styles.image} />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.randomizeImageAndRound}>
            <Text style={styles.buttonText}>随机图片</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rewardContainer}>
          {this.state.rewards.map((reward, index) => (
            <Image key={index} source={reward} style={styles.rewardImage} />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  seasonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  seasonText: {
    color: '#000',
    fontSize: 36,
    fontWeight: 'bold',
  },
  roundText: {
    color: '#000',
    fontSize: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  rewardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  rewardImage: {
    width: width * 0.5,
    height: width * 0.6,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
