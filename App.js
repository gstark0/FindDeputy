import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeputyScreen from './components/DeputyScreen';

const AppStackNavigator = createStackNavigator({
	DeputyScreen: {
		screen: DeputyScreen
	}
});

const App = createAppContainer(AppStackNavigator);
export default App;