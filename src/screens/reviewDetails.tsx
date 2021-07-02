import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Modal } from 'react-native';

const reviewDetails = ({navigation}) => {
	const friends = [
		{ type: 'Image #1', image: require('../../assets/lunch2.jpg') },
		{ type: 'Image #2', image: require('../../assets/school_lunch_tray.jpg') },
		{ type: 'Image #3', image: require('../../assets/lunch3.jpeg') },
		{ type: 'Image #3', image: require('../../assets/food.jpg') },
	];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.reviewStyle}>
				<Text style={styles.imageTitle}>Past Photos</Text>
			</View>
					<FlatList
						showsVerticalScrollIndicator={true}
						keyExtractor={(friend) => friend.type}
						data={friends}
						renderItem={({ item }) => {
							// item === {name: 'Friend #1' ...}
							return (
								<TouchableOpacity onPress={() => navigation.navigate('Details')}>
									{/*@ts-ignore*/}
									<Image style={styles.imageStyle} source={item.image} />
								</TouchableOpacity>
							);
						}}
					/>
	</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',

	},
	reviewDetails:{
		margin: 15,

	},
	imageStyle:{
		width: 330,
		height: 240,
		margin: 7.5,
		borderRadius: 20,
	},
	imageTitle: {
		fontSize: 50,
		fontWeight: 'bold',
		color: 'white'
		
	},
	reviewStyle:{
		marginTop: 30,
		margin: 7.5,
		backgroundColor: '#97fed5',
		borderRadius: 20,
		alignItems: 'center'
	}
});
export default reviewDetails;
