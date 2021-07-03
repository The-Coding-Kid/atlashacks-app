import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return<View style={styles.centeredView}>
				<Modal animationType="slide" transparent={false} visible={modalVisible}>
				<View style={styles.container}>
			<Camera style={styles.camera} type={type}>
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
				</Modal>
				
					<TouchableOpacity
						style={styles.takePhoto}
						onPress={() => {
							setModalVisible(true)
							}}>
						<Text>Take a photo</Text>
							
					</TouchableOpacity>
						
					
				
	</View>}
	


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
		margin: 20,
	},
	text: {
		color: 'white',
		fontWeight: 'bold'
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
		fontWeight: 'bold',
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
		alignItems: 'center',
		marginTop: 35,
		marginLeft: 250,
		position: 'absolute'
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
		marginBottom: 15,
		textAlign: 'center',
	},
	takePhoto:{
		backgroundColor: 'blue',
		height: 70,
		width: 300,
		borderRadius: 25
	},
	backButton:{
		width: 100,
		alignItems: 'center'
	},
	flipButton:{
		position: 'absolute',
		backgroundColor: '#2196F3',
		borderRadius: 15,
		paddingHorizontal: 40,
		paddingVertical: 10,
		marginTop: 13,
		marginLeft: 0

	}
});

