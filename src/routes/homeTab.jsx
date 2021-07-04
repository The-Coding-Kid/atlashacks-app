import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeScreen from '../screens/homeScreen';
import photoScreen from '../screens/photoScreen';
import reviewDetails from '../screens/reviewDetails';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Navigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				lazy={false}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = focused ? 'home' : 'home-outline';
						} else if (route.name === 'Upload') {
							iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
						} else if (route.name === 'Past Uploads') {
							iconName = focused ? 'clipboard' : 'clipboard-outline';
						}
						//@ts-ignore
						return <Ionicons name={iconName} size={size} color="white" />;
					},
				})}
				tabBarOptions={{
					style: {
						backgroundColor: '#1e56a9',
					},
					labelStyle: {
						fontFamily: 'Roboto-Condensed-Bold'
					},
					activeTintColor: '#ffffff',
					inactiveTintColor: '#ffffff',
				}}>
				<Tab.Screen name="Upload" component={photoScreen} />
				<Tab.Screen name="Home" component={homeScreen} />
				<Tab.Screen name="Past Uploads" component={reviewDetails} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
