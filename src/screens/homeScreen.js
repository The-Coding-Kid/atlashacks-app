import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function homeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.Home}>

			</View>
			<View>

			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Home:{
		marginTop: 25,
		margin: 15,
		height: 150,
		backgroundColor: '#a9ffa1',
		borderRadius: 20
	}
});
