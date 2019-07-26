import ChatScreen from './chatScreen';
import RawDataScreen from './rawDataScreen';
import ChartScreen from './chartScreen';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'; 

const Nav = createAppContainer(createBottomTabNavigator(
    {
      Chat: ChatScreen,
      RawData: RawDataScreen,
      Chart: ChartScreen
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
          },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }
    }
  ));
export default Nav;