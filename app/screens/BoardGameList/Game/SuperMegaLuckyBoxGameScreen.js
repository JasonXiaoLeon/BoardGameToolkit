import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

export default class SuperMegaLuckyBoxGameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: this.generateDeck(),   // 初始牌库
      drawnCards: [],              // 已抽取的牌
      latestCard: null,            // 最新抽到的牌
      round: 1                     // 当前轮次
    }
  }

  // 生成18张牌的牌库，每种牌2张
  generateDeck = () => {
    let deck = []
    for (let i = 1; i <= 9; i++) {
      deck.push(i, i) // 每种牌2张
    }
    return deck
  }

  // 从牌库中随机抽取一张牌
  drawCard = () => {
    const { deck, drawnCards } = this.state
    if (drawnCards.length >= 9) {
      return // 如果已经抽了9张牌，则不再抽牌
    }
    
    if (deck.length === 0) {
      return // 如果牌库已空，不再抽牌
    }

    // 随机选择牌库中的一张牌
    const randomIndex = Math.floor(Math.random() * deck.length)
    const drawnCard = deck[randomIndex]

    // 更新状态：从牌库中移除抽到的牌，将其加入到已抽牌列表，记录最新抽到的牌
    this.setState({
      deck: deck.filter((_, index) => index !== randomIndex),
      drawnCards: [...drawnCards, drawnCard],
      latestCard: drawnCard        // 更新最新抽到的牌
    })
  }

  // 结束当前轮并重置牌库和抽到的牌
  endRound = () => {
    const { round } = this.state
    if (round >= 4) {
      // 第4轮结束，重置游戏回到第1轮
      this.setState({
        deck: this.generateDeck(),   // 重置牌库
        drawnCards: [],              // 清空已抽取的牌
        latestCard: null,            // 清空最新抽到的牌
        round: 1                     // 重置到第1轮
      })
    } else {
      // 进入下一轮
      this.setState({
        deck: this.generateDeck(),   // 重置牌库
        drawnCards: [],              // 清空已抽取的牌
        latestCard: null,            // 清空最新抽到的牌
        round: round + 1             // 进入下一轮
      })
    }
  }

  render() {
    const { drawnCards, latestCard, round } = this.state
    const isRoundComplete = drawnCards.length === 9

    return (
      <View style={styles.container}>
        <Text style={styles.header}>回合数: {round}</Text>

        <Text style={styles.drawnCards}>已抽到的牌: {drawnCards.join(', ')}</Text>

        {/* 保持固定高度 */}
        <View style={styles.cardContainer}>
          {latestCard !== null ? (
            <Text style={styles.latestCard}>{latestCard}</Text>
          ) : (
            <Text style={styles.placeholderCard}>--</Text> // 这是一个占位符
          )}
        </View>

        {/* 固定两个按钮的容器 */}
        <View style={styles.buttonContainer}>
          <Button 
            title="下一张" 
            onPress={this.drawCard} 
            disabled={isRoundComplete} // 禁用按钮当抽满9张时
          />
          {/* "回合结束"按钮一直存在，只是当回合未完成时禁用 */}
          <Button 
            title="回合结束" 
            onPress={this.endRound} 
            disabled={!isRoundComplete} // 仅当回合完成时激活
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    marginBottom: 20
  },
  drawnCards: {
    fontSize: 18,
    marginBottom: 20
  },
  cardContainer: {
    height: 256,          // 固定高度，确保位置一致
    justifyContent: 'center',  // 保证牌居中
    alignItems: 'center',
    marginBottom: 20
  },
  latestCard: {
    fontSize: 256,         // 较大的字体
    color: 'red',          // 红色字体
    textShadowColor: '#000',      // 阴影颜色（黑色）
    textShadowOffset: { width: 2, height: 2 },  // 阴影偏移量
    textShadowRadius: 5,   // 阴影半径
  },
  placeholderCard: {
    fontSize: 256,         // 占位符的字体大小和 latestCard 保持一致
    color: 'transparent',  // 隐藏占位符但仍然占据空间
  },
  buttonContainer: {
    flexDirection: 'row',   // 按钮横向排列
    justifyContent: 'space-between',
    width: '60%',           // 按钮容器宽度
    height: 60,             // 固定高度，确保布局不变
    marginTop: 20           // 按钮与上方内容的间距
  }
})
