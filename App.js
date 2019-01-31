import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeputyScreen from './components/DeputyScreen';
import DeputyInfo from './components/DeputyInfo';

const AppStackNavigator = createStackNavigator({
	DeputyScreen: {
		screen: DeputyScreen
	},

	DeputyInfo: {
		screen: DeputyInfo
	}
});

const App = createAppContainer(AppStackNavigator);
export default App;