import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class FirstPlayerJudgementScreen extends Component {
  state = {
    activeIndex: Math.floor(Math.random() * 4), // 随机初始激活的按钮索引
    isRunning: false, // 判断是否在运行
    intervalId: null, // 存储定时器 ID
    finalIndex: null, // 最终停留的按钮索引
  };

  // 自定义顺序 [按钮 1 → 2 → 4 → 3]
  sequence = [0, 1, 3, 2];

  // 开始抽奖
  startRandomSelection = () => {
    if (this.state.isRunning) return; // 如果已经在运行，阻止再次点击

    this.setState({ isRunning: true, finalIndex: null });

    // 设置定时器，每100毫秒切换一次按钮
    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        activeIndex: this.sequence[(this.sequence.indexOf(prevState.activeIndex) + 1) % this.sequence.length], // 根据顺序切换按钮
      }));
    }, 100);

    this.setState({ intervalId });

    // 随机停止时间为 2 到 5 秒之间
    const stopTime = Math.random() * (5000 - 2000) + 2000;

    // 随机时间后停止，并随机选择一个按钮
    setTimeout(() => {
      clearInterval(this.state.intervalId); // 清除定时器
      const finalIndex = Math.floor(Math.random() * 4); // 随机停在某个按钮上
      this.setState({ 
        isRunning: false, 
        finalIndex, 
        activeIndex: finalIndex 
      });
    }, stopTime); // 使用随机停止时间
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.startRandomSelection}>
        <View style={styles.row}>
          {this.renderButton(0)}
          {this.renderButton(1)}
        </View>
        <View style={styles.row}>
          {this.renderButton(2)}
          {this.renderButton(3)}
        </View>
      </TouchableOpacity>
    );
  }

  // 渲染每个按钮
  renderButton(index) {
    const isActive = this.state.activeIndex === index;
    return (
      <TouchableOpacity
        key={index}
        style={[styles.button, isActive ? styles.activeButton : null]}
        disabled
      >
        <Text style={[styles.buttonText, { color: isActive ? '#fff' : '#000' }]}>
          第 {index + 1} 位玩家
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: width / 2, // 每个按钮占屏幕的一半宽度
    height: height / 2, // 每个按钮占屏幕的一半高度
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  activeButton: {
    backgroundColor: 'blue', // 激活状态的背景颜色
  },
  buttonText: {
    fontSize: 32,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight:'bold',
  },
});
