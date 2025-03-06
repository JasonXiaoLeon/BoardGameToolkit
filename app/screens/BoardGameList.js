import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons'; // 导入图标库

const BoardGameList = () => {
  const navigation = useNavigation(); // 获取导航对象

  const [boardGames, setBoardGames] = useState([
    { name: '王国制图师', route: 'CartographersScreen' },
    { name: '阿纳克遗迹', route: 'LostRuinsOfArnakScreen' },
    { name: '超级无敌幸运盒子', route: 'SuperMegaLuckyBox' }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newGame, setNewGame] = useState({
    name: '',
    playerCount: '',
    gameDuration: '',
    gameWeight: '',
    age: '',
    gameRank: ''
  });

  const handlePress = (route) => {
    navigation.navigate(route); // 导航到对应的 screen
  };

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleFormSubmit = () => {
    setBoardGames([...boardGames, { name: newGame.name, route: 'NewGameScreen' }]);
    setModalVisible(false);
    setNewGame({
      name: '',
      playerCount: '',
      gameDuration: '',
      gameWeight: '',
      age: '',
      gameRank: ''
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={boardGames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item.route)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {/* 加号按钮 */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* 表单弹窗 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              {/* 阻止点击事件传递到背景 */}
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>添加新桌游</Text>
                <TextInput
                  style={styles.input}
                  placeholder="桌游名称"
                  value={newGame.name}
                  onChangeText={(text) => setNewGame({ ...newGame, name: text })}
                  placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                  <Text style={styles.submitText}>提交</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  item: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: '#333',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default BoardGameList;
