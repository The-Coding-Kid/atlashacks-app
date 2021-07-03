import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import  ImageContext, { BlogProvider } from '../context/context';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Image,
} from 'react-native';



export default function homeScreen({ navigation }) {
	const {friends, setFriends} = useContext(ImageContext)
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.Home}>
					<Text style={styles.HomeText}> Home</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Upload')} style={styles.Upload}>
					<Text style={styles.UploadText}>Upload</Text>
					<Text style={styles.UploadText}>Photo</Text>
				</TouchableOpacity>
				<View style={styles.reviewStyle}>
					<Text style={styles.imageTitle}>Past Photos</Text>
					<FlatList
						showsVerticalScrollIndicator={true}
						keyExtractor={(friend) => friend.type}
						data={friends}
						renderItem={({ item }) => {
							// item === {name: 'Friend #1' ...}
							return (
								<Image style={styles.imageStyle} source={item.image} />

							);
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	Home: {
		marginTop: 30,
		margin: 15,
		height: 150,
		backgroundColor: '#97fed5',
		borderRadius: 20,
		justifyContent: 'center',
	},
	Upload: {
		marginBottom: 15,
		marginHorizontal: 15,
		height: 250,
		backgroundColor: '#4ee3ff',
		borderRadius: 25,
		alignItems: 'center',
	},
	UploadText: {
		alignSelf: 'center',
		fontSize: 50,
		fontWeight: 'bold',
		color: 'white',
	},
	HomeText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 50,
		color: 'white',
	},
	reviewStyle: {
		marginBottom: 15,
		marginHorizontal: 15,
		backgroundColor: '#85cbca',
		borderRadius: 25,
		alignItems: 'center',
	},
	imageStyle: {
		height: 240,
		width: 300,
		marginTop: 7,
		marginBottom: 13,
		borderRadius: 20,
	},
	imageTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
	},
	
});
