import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
var axios = require('axios');

export default function homeScreen({ navigation }) {
	const friends = [
		{ name: 'Image #4', image: require('../../assets/food.jpg') },
		{ name: 'Image #1', image: require('../../assets/lunch2.jpg') },
		{ name: 'Image #2', image: require('../../assets/school_lunch_tray.jpg') },
		{ name: 'Image #3', image: require('../../assets/lunch3.jpeg') },
	];
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get('http://192.168.86.27:5000/all')
				.then((res) => {
					setData(res.data);
				})
				.catch((err) => console.error(err));
		};
		const interval = setInterval(() => {
			fetchData();
		}, 10000);

		return () => clearInterval(interval);
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			{/* <Image style={styles.carrot} source={require('../../assets/carrot3.png')}/>
			<Image style={styles.tomatoe} source={require('../../assets/tomato.png')}/>
			<Image style={styles.camera} source={require('../../assets/camera.png')}/> */}

			<ScrollView>
				<View style={styles.Home}>
					<Ionicons name="menu" size={30} color="white" style={styles.menu} />
					<Text style={styles.HomeText}>Fresh Choices</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Upload')} style={styles.Upload}>
					<Text style={styles.UploadText}>Upload Photo </Text>
					<Ionicons name="camera-outline" size={40} color="white" />
					{/* <Text style={styles.UploadText}></Text> */}
				</TouchableOpacity>

				<View style={styles.reviewStyle}>
					<Text style={styles.imageTitle}>Past Photos</Text>
					<FlatList
						showsVerticalScrollIndicator={true}
						keyExtractor={(friend) => friend.id}
						data={data}
						renderItem={({ item }) => {
							// item === {name: 'Friend #1' ...}
							return <Image style={styles.imageStyle} source={{ uri: item.file_name }} />;
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
		backgroundColor: '#e5e5e5',
	},
	Home: {
		height: 70,
		backgroundColor: '#1e56a9',
		marginVertical: 30,
		justifyContent: 'center',
		borderColor: '#c0c0c0',
		//@ts-ignore
		borderColor: 'black',
		shadowColor: 'black',
		shadowOffset: {
			width: 1000000,
			height: 1000000,
		},
		shadowOpacity: 0.777777,
		shadowRadius: 10,
		elevation: 6,
		flexDirection: 'row',
		//@ts-ignore
		justifyContent: 'flex-start',
	},
	Upload: {
		marginBottom: 15,
		marginHorizontal: 15,
		height: 70,
		backgroundColor: '#1e56a9',
		// // borderRadius: 25,
		// borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'black',
		shadowOffset: {
			width: 1000000,
			height: 1000000,
		},
		shadowOpacity: 0.777777,
		shadowRadius: 10,
		elevation: 6,
		flexDirection: 'row',
	},
	UploadText: {
		alignSelf: 'center',
		fontSize: 25,
		color: '#fff',
		fontFamily: 'Roboto-Condensed-Bold',
	},
	HomeText: {
		alignSelf: 'center',
		fontSize: 25,
		color: 'white',
		marginLeft: 100,
		fontFamily: 'Roboto-Condensed-Bold',
	},
	reviewStyle: {
		marginBottom: 15,
		marginHorizontal: 15,
		backgroundColor: '#fff',
		alignItems: 'center',
		shadowColor: 'black',
		shadowOffset: {
			width: 1000000,
			height: 1000000,
		},
		shadowOpacity: 0.777777,
		shadowRadius: 10,
		elevation: 6,
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
		color: '#1e56a9',
		fontFamily: 'Roboto-Condensed-Bold',
	},
	carrot: {
		position: 'absolute',
		marginRight: 20,
		height: 450,
		width: 460,
	},
	tomatoe: {
		position: 'absolute',
		height: 570,
		width: 200,
	},
	menu: {
		marginTop: 19.5,
	},
	camera: {
		elevation: 10,
		position: 'absolute',
		height: 600,
		width: 490,
	},
});
