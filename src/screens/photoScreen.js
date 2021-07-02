import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({ navigation }) {
	const [image, setImage] = useState(null);

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

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const uploadPhoto = () => {
		navigation.navigate('Details');
	};

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
			<TouchableOpacity
				style={{
					backgroundColor: '#25ffaa',
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
					backgroundColor: '#6fff7e',
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
