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
import { Ionicons } from '@expo/vector-icons';
var axios = require('axios');

const reviewDetails = ({ navigation }) => {
	// const friends = [
	// 	{ type: 'Image #1', image: require('../../assets/lunch2.jpg') },
	// 	{ type: 'Image #2', image: require('../../assets/school_lunch_tray.jpg') },
	//   { type: 'Image #3', image: require('../../assets/lunch3.jpeg') },
	//   { type: 'Image #4', image: require('../../assets/food.jpg') }]
	const [modalVisible, setModalVisible] = useState(false);
	const [images, setImages] = useState(null);
	const [data, setData] = useState(null);
	const [star, setStar] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(`https://fresh-choices.herokuapp.com/all`)
				.then((res) => {
					console.log(res.data);
					setData(res.data);
				})
				.catch((err) => console.error(err));
		};
		fetchData();
		const interval = setInterval(() => {
			fetchData();
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.reviewStyle}>
				<Ionicons name="menu" size={30} color="white" style={styles.menu} />
				<Text style={styles.imageTitle}>Past Photos</Text>
			</View>
			<View style={styles.centeredView}>
				<Modal animationType="slide" transparent={false} visible={modalVisible}>
					<View style={styles.centeredView}>
						<Image style={styles.imageStyle} source={{ uri: images }} />
						<Text></Text>
						{star === 2 ? (
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
							</View>
						) : star === 3 ? (
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
							</View>
						) : star === 4 ? (
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
							</View>
						) : star === 5 ? (
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
							</View>
						) : star === 2.5 ? (
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star-half" size={30} color="#ffd944" />
							</View>
						) : star === 3.5 ? (
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star-half" size={30} color="#ffd944" />
							</View>
						) : star === 4.5 ? (
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star" size={30} color="#ffd944" />
								<Ionicons name="star-half" size={30} color="#ffd944" />
							</View>
						) : null}
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
					//@ts-ignore
					keyExtractor={(data) => data.file_name * data.id}
					data={data}
					renderItem={({ item }) => {
						// item === {name: 'Friend #1' ...} */}
						return (
							<TouchableOpacity
								onPress={() => {
									setModalVisible(true);
									setImages(item.file_name);
									setStar(item.stars);
								}}>
								{/*@ts-ignore*/}
								<Image style={styles.imageStyle} source={{ uri: item.file_name }} />
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
		backgroundColor: '#e5e5e5',
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
		marginLeft: 120,
		position: 'absolute',
		fontSize: 25,
		fontFamily: 'Roboto-Condensed-Bold',
		color: 'white',
	},
	reviewStyle: {
		marginTop: 30,
		height: 70,
		backgroundColor: '#1e56a9',
		alignItems: 'center',
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
	menu: {
		position: 'absolute',
		marginLeft: 0,
	},
});

export default reviewDetails;
