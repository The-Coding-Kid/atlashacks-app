import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function homeScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.Home}>

			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Home:{
		marginTop: 20,
		margin: 15,
		height: 100,
		backgroundColor: '#a9ffa1',
		borderRadius: 20
	}
});
