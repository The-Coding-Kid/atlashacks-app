import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function homeScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.Home}>

			</View>
			<TouchableOpacity onPress={() => navigation.navigate('Upload')} style ={styles.Upload}>
				<Text style={styles.UploadText}>Upload Image</Text>
			</TouchableOpacity>

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
	},
	Upload:{
		margin: 15,
		height: 250,
		backgroundColor: '#3fffa1',
		borderRadius: 25
	},
	UploadText:{
		alignSelf: 'center',
		fontSize: 50,
		fontWeight: 'bold',
		color: 'white'

	}
});
