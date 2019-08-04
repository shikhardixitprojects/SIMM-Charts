import React from "react"
import ChatScreen from './chatScreen';
import RawDataScreen from './rawDataScreen';
import ChartScreen from './chartScreen';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

const Nav = createAppContainer(createBottomTabNavigator(
  {
    RawData: {
      screen: RawDataScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name='table' type='antdesign' />
      }
    },
    Chart: {
      screen: ChartScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name='linechart' type='antdesign' />
      }
    }/*,
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: () => <Icon name='md-chatboxes' type='ionicon' />
      }
    },*/
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
));
export default Nav;