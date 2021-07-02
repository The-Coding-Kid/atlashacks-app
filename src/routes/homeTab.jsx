import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeScreen from '../screens/homeScreen';
import photoScreen from '../screens/photoScreen';

const Tab = createBottomTabNavigator();

export default function Navigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={homeScreen} />
				<Tab.Screen name="Upload" component={photoScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
