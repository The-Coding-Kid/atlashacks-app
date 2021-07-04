import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import {
	Button,
	Image,
	View,
	Platform,
	TouchableOpacity,
	Text,
	ScrollView,
	SafeAreaView,
	Modal,
	StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './CameraScreen';
var axios = require('axios');

export default function ImagePickerExample({ navigation }) {
	const [image, setImage] = useState('bob');
	const [modalVisible, setModalVisible] = useState(false);
	const [images, setImages] = useState(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [cameraRef, setCameraRef] = useState(null);
	const [containted, setContainted] = useState([]);
	const [notcontainted, setNotContainted] = useState([]);
	const [stars, setStars] = useState(null);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [uri, setUri] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			}
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);
		if (result.cancelled === false) {
			setImage(result);
		}
	};

	const uploadPhoto = async () => {
		let formData = new FormData();
		//@ts-ignore
		let string = image.uri;
		setUri(image.uri);
		//@ts-ignore
		let file_name = ' ';
		console.log('Data: ', image);
		//@ts-ignore
		for (let i = 0; i < image.uri.length; i++) {
			//@ts-ignore
			let substr = string.substring(i, image.uri.length);
			if (!substr.includes('/')) {
				file_name = substr;
				break;
			}
		}
		console.log(file_name);
		formData.append('image', {
			//@ts-ignore
			uri: image.uri,
			//@ts-ignore
			name: file_name,
			type: 'image/jpeg',
		});
		try {
			const response = await axios.post(`http://192.168.86.234:5000/upload-image`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log(response.data);
			setContainted(response.data[0]);
			setNotContainted(response.data[1]);
			setStars(response.data[2]);
		} catch (err) {
			console.error(err.response.data);
		}
		try {
			const response = await axios.post(`http://192.168.86.234:5000/store`, {
				uri: image.uri,
				stars: stars,
			});
			console.log(response.data);
		} catch (err) {
			console.error(err.response.data);
		}
		setModalVisible2(true);
		setImages(item.image);
	};

	return (
		<SafeAreaView style={{ flexDirection: 'column' }}>
			<ScrollView
				style={{ marginBottom: 30 }}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}>
				{image && (
					<Image
						//@ts-ignore
						source={{ uri: image.uri }}
						style={{ width: 320, height: 400, borderRadius: 20, alignSelf: 'center' }}
					/>
				)}
				<TouchableOpacity
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 10,
						height: 70,
						marginHorizontal: 36,
						marginTop: 30,
						backgroundColor: '#1e56a9',
						marginBottom: 10,
					}}
					onPress={pickImage}>
					<Text
						style={{
							color: 'white',
							fontSize: 30,
							fontWeight: 'bold',
							fontFamily: 'Roboto-Condensed',
						}}>
						Choose Photo
					</Text>
				</TouchableOpacity>

				<View style={styles.centeredView}>
					<Modal animationType="slide" transparent={false} visible={modalVisible}>
						<View style={styles.container}>
							<Camera
								style={styles.camera}
								type={type}
								ref={(ref) => {
									setCameraRef(ref);
								}}
								ratio="5:4">
								<View style={styles.buttonContainer}>
									<TouchableOpacity
										style={styles.flipButton}
										onPress={() => {
											setType(
												type === Camera.Constants.Type.back
													? Camera.Constants.Type.front
													: Camera.Constants.Type.back
											);
										}}>
										<Text style={styles.text}> Flip </Text>
									</TouchableOpacity>
								</View>
							</Camera>
						</View>
						<TouchableOpacity
							style={[styles.button, styles.buttonClose]}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}>
							<View style={styles.backButton}>
								<Text style={styles.textStyle}>Back</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ position: 'absolute', marginTop: 700, marginLeft: 150 }}
							onPress={async () => {
								if (cameraRef) {
									let photo = await cameraRef.takePictureAsync();
									console.log('photo', photo);
									setImage(photo);
									setModalVisible(!modalVisible);
								}
							}}>
							<Ionicons name="ellipse-outline" color="white" size={75} style={{ elevation: 999 }} />
						</TouchableOpacity>
					</Modal>

					<Modal animationType="slide" transparent={false} visible={modalVisible2}>
						<View style={styles.centeredView}>
							<Image style={styles.imageStyle} source={{ uri: uri }} />
							<View style={{ marginTop: 40, marginBottom: 30 }}>
								<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Overall Rating: {stars}</Text>
							</View>
							{stars === 2 ? (
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
								</View>
							) : stars === 3 ? (
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
								</View>
							) : stars === 4 ? (
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
								</View>
							) : stars === 5 ? (
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
								</View>
							) : stars === 2.5 ? (
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star-half" size={30} color="#ffd944" />
								</View>
							) : stars === 3.5 ? (
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star-half" size={30} color="#ffd944" />
								</View>
							) : stars === 4.5 ? (
								<View style={{ flexDirection: 'row' }}>
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star" size={30} color="#ffd944" />
									<Ionicons name="star-half" size={30} color="#ffd944" />
								</View>
							) : null}
							<TouchableOpacity
								style={[styles.button2, styles.buttonClose]}
								onPress={() => {
									setModalVisible2(!modalVisible2);
								}}>
								<Text style={styles.textStyle}>Done</Text>
							</TouchableOpacity>
						</View>
					</Modal>
					<TouchableOpacity
						style={styles.takePhoto}
						onPress={() => {
							setModalVisible(true);
						}}>
						<Text style={styles.buttonText}>Take a photo</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#1e56a9',
						borderRadius: 10,
						height: 70,
						marginHorizontal: 36,
						marginTop: 35,
					}}
					onPress={uploadPhoto}>
					<Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Upload It</Text>
				</TouchableOpacity>
				{/* <Image source={require('../../assets/carrot2.png')} /> */}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
	},
	imageStyle: {
		width: 330,
		height: 240,
		margin: 7.5,
		marginTop: 30,
		borderRadius: 20,
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
		alignItems: 'center',
		marginTop: 35,
		marginLeft: 250,
		position: 'absolute',
	},
	button2: {
		borderRadius: 15,
		padding: 10,
		elevation: 2,
		alignItems: 'center',
		marginTop: 300,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
	},
	modalText: {
		color: 'white',
		textAlign: 'center',
	},
	takePhoto: {
		backgroundColor: '#1e56a9',
		height: 70,
		borderRadius: 10,
		paddingHorizontal: 46,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backButton: {
		width: 100,
		alignItems: 'center',
	},
	flipButton: {
		position: 'absolute',
		backgroundColor: '#2196F3',
		borderRadius: 15,
		paddingHorizontal: 40,
		paddingVertical: 10,
		marginTop: 35,
		marginLeft: 0,
	},
	buttonText: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 30,
	},
});
