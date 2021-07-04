import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/routes/homeTab';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	const loadFonts = async () => {
		await Font.loadAsync({
			'Roboto-Condensed': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf'),
			'Roboto-Condensed-Bold': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf'),
			'Roboto-Condensed-BoldItalic': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-BoldItalic.ttf'),
			'Roboto-Condensed-Italic': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Italic.ttf'),
			'Roboto-Condensed-Light': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-Light.ttf'),
			'Roboto-Condensed-LightItalic': require('./assets/fonts/Roboto_Condensed/RobotoCondensed-LightItalic.ttf'),
		});
		setFontsLoaded(true);
	};

	useEffect(() => {
		loadFonts();
	}, []);

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<>
			<StatusBar style="auto" />
			<Navigator />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
