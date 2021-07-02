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
} from 'react-native';

interface Image {
	title: string;
}

export default function homeScreen({ navigation }) {
	let formData = new FormData();
	const friends: Image[] = [
		{ title: 'Image #0' },
		{ title: 'Image #1' },
		{ title: 'Image #2' },
		{ title: 'Image #3' },
		{ title: 'Image #4' },
		{ title: 'Image #5' },
		{ title: 'Image #6' },
		{ title: 'Image #7' },
		{ title: 'Image #8' },
	];
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.Home}>
					<Text style={styles.HomeText}> Home</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Upload')} style={styles.Upload}>
					<Text style={styles.UploadText}>Upload Image</Text>
				</TouchableOpacity>
				<View style={styles.reviewStyle}>
					<FlatList
						showsVerticalScrollIndicator={true}
						keyExtractor={(friend) => friend.title}
						data={friends}
						renderItem={({ item }) => {
							// item === {name: 'Friend #1' ...}
							return (
								<TouchableOpacity onPress={() => navigation.navigate('Details')}>
									<Text style={styles.listStyle}>{item.title}</Text>
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
		marginTop: 25,
		margin: 15,
		height: 150,
		backgroundColor: '#a9ffa1',
		borderRadius: 20,
	},
	Upload: {
		margin: 15,
		height: 250,
		backgroundColor: '#3fffa1',
		borderRadius: 25,
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
		margin: 10,
		backgroundColor: '#86d39f',
		borderRadius: 20,
		alignItems: 'center',
	},
	listStyle: {
		color: 'white',
	},
});
