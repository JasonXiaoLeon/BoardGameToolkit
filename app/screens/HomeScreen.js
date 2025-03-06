import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);

  const handleStartGame = () => {
    if (numberOfPlayers === 4) {
      navigation.navigate('StartPlayer');
    }
    else if(numberOfPlayers === 3){
      navigation.navigate('RotatingPicker');

    } 
    else {
      alert('目前只支持4人游戏，请选择4人。');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jason的口袋桌游助手</Text>
      <Text style={styles.label}>选择人数:</Text>
      <Picker
        selectedValue={numberOfPlayers}
        style={styles.picker}
        onValueChange={(itemValue) => setNumberOfPlayers(Number(itemValue))} // 确保转换为数字
      >
        <Picker.Item label="1人" value={1} />
        <Picker.Item label="2人" value={2} />
        <Picker.Item label="3人" value={3} />
        <Picker.Item label="4人" value={4} />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button
          title="开始游戏"
          onPress={handleStartGame}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 120, // 调整按钮与 Picker 之间的间距
  }
});

export default HomeScreen;
