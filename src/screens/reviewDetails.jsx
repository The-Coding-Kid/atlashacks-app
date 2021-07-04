import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	SafeAreaView,
	Modal,
} from 'react-native';
var axios = require('axios');

const reviewDetails = ({ navigation }) => {
	// const friends = [
	// 	{ type: 'Image #1', image: require('../../assets/lunch2.jpg') },
	// 	{ type: 'Image #2', image: require('../../assets/school_lunch_tray.jpg') },
	//   { type: 'Image #3', image: require('../../assets/lunch3.jpeg') },
	//   { type: 'Image #4', image: require('../../assets/food.jpg') }]
	const [modalVisible, setModalVisible] = useState(false);
	const [images, setImages] = useState(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get('http://192.168.86.234:5000/all')
			.then((res) => setData(res.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.reviewStyle}>
				<Text style={styles.imageTitle}>Past Photos</Text>
			</View>
			<View style={styles.centeredView}>
				<Modal animationType="slide" transparent={false} visible={modalVisible}>
					<View style={styles.centeredView}>
						<Image style={styles.imageStyle} source={images} />
						<TouchableOpacity
							style={[styles.button, styles.buttonClose]}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}>
							<Text style={styles.textStyle}>Back</Text>
						</TouchableOpacity>
					</View>
				</Modal>
				<FlatList
				showsVerticalScrollIndicator={true}
				keyExtractor={(data) => data.id}
				data={data}
				renderItem={({ item }) => {
				// item === {name: 'Friend #1' ...} */}
				return ( 
				<TouchableOpacity 
				onPress={() => { 
				setModalVisible(true); 
				setImages(item.image); 
				}}> 
				{/*@ts-ignore*/}
				<Image style={styles.imageStyle} source={{uri: item.file_name}} /> 
				</TouchableOpacity> 
				); 
				}} 
				/> 
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	reviewDetails: {
		margin: 15,
	},
	imageStyle: {
		width: 330,
		height: 240,
		margin: 7.5,
		borderRadius: 20,
	},
	imageTitle: {
		fontSize: 50,
		fontFamily: 'Roboto-Condensed-Bold',
		color: 'white',
	},
	reviewStyle: {
		marginTop: 30,
		margin: 7.5,
		backgroundColor: '#97fed5',
		borderRadius: 20,
		alignItems: 'center',
	},
	centeredView: {
		flex: 1,
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 15,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontFamily: 'Roboto-Condensed-Bold',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default reviewDetails;
