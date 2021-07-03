import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
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
	const friends = [
		{ name: 'Image #1', image: require('../../assets/lunch2.jpg') },
		{ name: 'Image #2', image: require('../../assets/school_lunch_tray.jpg') },
	  { name: 'Image #3', image: require('../../assets/lunch3.jpeg') },
	  { name: 'Image #4', image: require('../../assets/food.jpg') }]
	return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.carrot} source={require('../../assets/carrot3.png')}/>
			<Image style={styles.tomatoe} source={require('../../assets/tomato.png')}/>
			<Image style={styles.camera} source={require('../../assets/camera.png')}/>

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
						keyExtractor={(friend) => friend.name}
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
	carrot:{
		position: 'absolute',
		marginRight: 20,
		height: 450,
		width: 460
	},
	tomatoe:{
		position: 'absolute',
		height: 570,
		width: 200
		
	},
	camera:{
		elevation: 10,
		position: 'absolute',
		height: 600,
		width: 490
	}
	
});
