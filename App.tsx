import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/routes/homeTab';
import { BlogProvider } from './src/context/context';

export default function App() {
	return (
		<BlogProvider>
			<StatusBar style="auto" />
			<Navigator />
		</BlogProvider>
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
