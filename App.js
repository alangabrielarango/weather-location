//importing navigation libraries
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

//importing screens
import Home from './views/Home';

//creating navigator
const navigator =  createStackNavigator (
  {
  Home:{screen: Home}
});

export default createAppContainer(navigator);