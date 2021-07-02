import { StatusBar } from 'expo-status-bar';
import React from 'react';
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

interface image {
	type: string;
	image: string;
}

export default function homeScreen({ navigation }) {
	const friends: image[] = [
		{ type: 'Image #1', image: require('../../assets/lunch2.jpg')},
		{ type: 'Image #2', image: require('../../assets/school_lunch_tray.jpg')},
		{ type: 'Image #3', image: require('../../assets/lunch3.jpeg')},
	];
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
					<Text style={styles.imageTitle}>Past Uploads</Text>
					<FlatList
						showsVerticalScrollIndicator={true}
						keyExtractor={(friend) => friend.type}
						data={friends}
						renderItem={({ item }) => {
							// item === {name: 'Friend #1' ...}
							return (
								<TouchableOpacity onPress={() => navigation.navigate('Details')}>
									{/*@ts-ignore*/}
									<Image style={styles.imageStyle} source={item.image}/>
								</TouchableOpacity>
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
		backgroundColor: '#a9ffa1',
		borderRadius: 20,
		justifyContent: 'center'
	},
	Upload: {
		marginBottom: 15,
		marginHorizontal: 15,
		height: 250,
		backgroundColor: '#3fffa1',
		borderRadius: 25,
		alignItems: 'center'
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
		backgroundColor: '#86d39f',
		borderRadius: 25,
		alignItems: 'center',
	},
	imageStyle:{
		height: 240,
		width: 300,
		marginTop: 7,
		marginBottom: 13,
		borderRadius: 20
	},
	imageTitle:{
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white'
	}
});
