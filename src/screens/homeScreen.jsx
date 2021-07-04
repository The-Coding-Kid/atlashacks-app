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
		{ name: 'Image #4', image: require('../../assets/food.jpg') },
		{ name: 'Image #1', image: require('../../assets/lunch2.jpg') },
		{ name: 'Image #2', image: require('../../assets/school_lunch_tray.jpg') },
	  { name: 'Image #3', image: require('../../assets/lunch3.jpeg') },]
	return (
		<SafeAreaView style={styles.container}>
			{/* <Image style={styles.carrot} source={require('../../assets/carrot3.png')}/>
			<Image style={styles.tomatoe} source={require('../../assets/tomato.png')}/>
			<Image style={styles.camera} source={require('../../assets/camera.png')}/> */}

			<ScrollView>
				<View style={styles.Home}>
					<Text style={styles.HomeText}> Home</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Upload')} style={styles.Upload}>
					<Text style={styles.UploadText}>Upload Photo</Text>
					{/* <Text style={styles.UploadText}></Text> */}
					
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
		backgroundColor: '#D6D6D6',
		borderRadius: 20,
		justifyContent: 'center',
		borderColor: '#c0c0c0',
		// borderWidth: 1,
		shadowColor: 'black',
    shadowOffset: {
      width: 1000000,
      height: 1000000
    },
    shadowOpacity: 0.777777,
    shadowRadius: 10,
    elevation: 6
	},
	Upload: {
		marginBottom: 15,
		marginHorizontal: 15,
		height: 150,
		backgroundColor: '#D6D6D6',
		borderRadius: 25,
		// borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1000000,
      height: 1000000
    },
    shadowOpacity: 0.777777,
    shadowRadius: 10,
    elevation: 6
	},
	UploadText: {
		alignSelf: 'center',
		fontSize: 40,
		fontWeight: 'bold',
		color: '#165e54',
	},
	HomeText: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 45,
		color: '#1e56a9',
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
