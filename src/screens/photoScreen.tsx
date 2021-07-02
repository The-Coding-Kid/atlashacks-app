import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
var axios = require('axios');

export default function ImagePickerExample({ navigation }) {
	const [image, setImage] = useState<Object | null>(null);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

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
		for (let i = 0; i < image.uri.length - 1; i++) {}
		formData.append('image', {
			//@ts-ignore
			uri: image.uri,
			//@ts-ignore
			name: '',
			type: 'image/jpeg',
		});
		try {
			const response = await axios.post(`http://192.168.86.234:5000/upload-image`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			console.log(response.data);
		} catch (err) {
			console.error(err.response.data);
		}
		navigation.navigate('Past Uploads', image);
	};

	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
			{image && (
				//@ts-ignore
				<Image source={{ uri: image.uri }} style={{ width: 300, height: 240, borderRadius: 20 }} />
			)}
			<TouchableOpacity
				style={{
					backgroundColor: '#4ee3ff',
					borderRadius: 10,
					height: 70,
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 60,
					width: 300,
				}}
				onPress={pickImage}>
				<Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', paddingHorizontal: 40 }}>
					Choose Photo
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					backgroundColor: '#60f4dc',
					borderRadius: 10,
					height: 70,
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 20,
					width: 300,
				}}
				onPress={uploadPhoto}>
				<Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', paddingHorizontal: 40 }}>
					Upload It
				</Text>
			</TouchableOpacity>
			{/* <Image source={require('../../assets/carrot2.png')} /> */}
		</View>
	);
}
