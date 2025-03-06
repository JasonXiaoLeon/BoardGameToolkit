import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons'; // 导入图标库
import HomeScreen from './app/screens/HomeScreen';
import BoardGameList from './app/screens/BoardGameList';
import LostRuinsOfArnak from './app/screens/BoardGameList/LostRuinsOfArnak';
import Cartographers from './app/screens/BoardGameList/Cartographers';
import MyScreen from './app/screens/MyScreen';
import CartographersGameScreen from './app/screens/BoardGameList/Game/CartographersGameScreen';
import SuperMegaLuckyBox from './app/screens/BoardGameList/SuperMegaLuckyBox';
import SuperMegaLuckyBoxGameScreen from './app/screens/BoardGameList/Game/SuperMegaLuckyBoxGameScreen'
import FirstPlayerJudgementScreen from './app/screens/Tools/FirstPlayerJudgementScreen';
import RotatingPickerScreen from './app/screens/Tools/RotatingPickerScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="StartPlayer"
        component={FirstPlayerJudgementScreen}
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen name="RotatingPicker" 
      component={RotatingPickerScreen} 
      options={{ headerShown: false, presentation: 'modal' }}
       />
    </Stack.Navigator>
  );
}

function BoardGameStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="List" 
        component={BoardGameList} 
        options={{ headerShown: true }} 
      />
      <Stack.Screen 
        name="CartographersScreen" 
        component={Cartographers} 
        options={{ title: '王国制图师', gestureEnabled: true }}
      />
       <Stack.Screen 
        name="CartographersGameScreen"
        component={CartographersGameScreen} 
        options={{ title: '游戏开始', gestureEnabled: true, headerShown: false }}
      />
      <Stack.Screen 
        name="LostRuinsOfArnakScreen" 
        component={LostRuinsOfArnak} 
        options={{ title: '阿纳克遗迹', gestureEnabled: true}}
      />
      <Stack.Screen 
        name="SuperMegaLuckyBox" 
        component={SuperMegaLuckyBox} 
        options={{ title: '超级无敌幸运盒子', gestureEnabled: true}}
      />
      <Stack.Screen 
        name="SuperMegaLuckyBoxGameScreen"
        component={SuperMegaLuckyBoxGameScreen} 
        options={{ title: '游戏开始', gestureEnabled: true, headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="BoardGames"
          component={BoardGameStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={focused ? 'gamepad-square' : 'gamepad-square-outline'}
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="My"
          component={MyScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
