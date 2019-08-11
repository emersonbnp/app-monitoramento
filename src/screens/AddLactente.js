import React, { Component } from "react";
import { TextInput, View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import params from "../params";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import {
	faPlusCircle,
	faBackward,
	faMapMarker
} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../components/general/custom-button";
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

async function requestCameraPermission() {
	try {
	  const granted = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.LOCATION,
		{
		  title: 'Solicitação de permissão de localização',
		  message:
			'O aplicativo requer acesso à localização do seu dispositivo  ' +
			'para disponibilizar para serviços médicos caso necessário.',
		  buttonNeutral: 'Ask Me Later',
		  buttonNegative: 'Cancel',
		  buttonPositive: 'OK',
		},
	  );
	  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		console.log('You can use the location');
	  } else {
		console.log('Location permission denied');
	  }
	} catch (err) {
	  console.warn(err);
	}
  }


class AddLactente extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: false,
			checkedSignIn: false,
			infant: {
				firstName: "",
				lastName: "",
				weight: "",
				birthday: "",
				device: ""
			},
			geolocation: {
				latitude: "",
				longitude: ""
			}
		};
		this.labels = [
			{
				label: "Nome",
				field: "firstName",
				state: this.state.infant.firstName
			},
			{
				label: "Sobrenome",
				field: "lastName",
				state: this.state.infant.lastName
			},
			{ 
				label: "Peso", 
				field: "weight", 
				state: this.state.infant.weight },
			{
				label: "Data de Nascimento",
				field: "birthday",
				state: this.state.infant.birthday
			},
			{
				label: "Dispositivo",
				field: "device",
				state: this.state.infant.device
			}
		];
	}

	componentDidMount() {
		AsyncStorage.getItem("id").then(result => {
			this.setState({ signedIn: true });
			this.setState({ id: JSON.parse(result) });
		});
	}

	getGeolocation() {
		requestCameraPermission().then(() => {
			Geolocation.getCurrentPosition(info => console.log(info));
		})
		
	}

	success(pos) {
		Alert.alert("Localização capturada com sucesso!");
		console.log("LOCALIZACAO =>", pos);
	}

	error(e) {
		console.log(e);
	}

	handleTextChange(text, field) {
		this.setState({ infant: { ...this.state.infant, [field]: text } });
	}

	render() {
		try {
			let elements = [];
			this.labels.forEach(e => {
				elements.push(
					<View key={e.field.concat("-1")} style={styles.row}>
						<Text style={styles.txt}>{e.label}: </Text>
					</View>
				);
				elements.push(
					<View key={e.field.concat("-2")} style={styles.row}>
						<TextInput
							style={styles.input}
							value={e[e.state]}
							onChangeText={text => {
								this.handleTextChange(text, e.field);
							}}
						/>
					</View>
				);
			});

			return (
				<View style={styles.wrapper}>
					<Header />
					<View style={styles.content}>
						<ScrollView style={{ marginBottom: 30 }}>
							{elements}
							<View style={styles.buttonCenter}>
								<CustomButton
									onPress={() => this.getGeolocation()}
									color={"#5F6A6A"}
									width={300}
									height={40}
									label="Usar Localização"
									icon={faMapMarker}
								/>
							</View>
							<View style={styles.buttonCenter}>
								<CustomButton
									onPress={() =>
										this.back(this.props.navigation)
									}
									color={"#C0392B"}
									width={150}
									height={60}
									label="Voltar"
									icon={faBackward}
								/>
								<CustomButton
									onPress={() =>
										this.add(this.props.navigation)
									}
									color={"#2ECC71"}
									width={150}
									height={60}
									label="Cadastrar"
									icon={faPlusCircle}
								/>
							</View>
						</ScrollView>
					</View>
				</View>
			);
		} catch (e) {
			console.log("ERROR =~=-=>", e);
		}
	}

	async back(navigation) {
		this.clearFieilds();
		navigation.navigate("Main");
	}

	async add(navigation) {
		var url = params.url + "/infant/" + this.state.id;
		var data = new FormData();
		data.append("firstName", this.state.infant.firstName);
		data.append("lastName", this.state.infant.lastName);
		data.append("weight", this.state.infant.weight);
		data.append("birthday", this.state.infant.birthday);
		data.append("device", this.state.infant.device);
		axios
			.post(url, data)
			.then(() => {
				axios
					.get(params.url + "/parent/" + this.state.id)
					.then(resp => {
						this.clearFieilds();
						navigation.navigate("Main", {
							infants: resp.data.infants
						});
					})
					.catch(e => {
						console.log(e);
					});
			})
			.catch(e => {
				console.log(e);
			});
	}

	clearFieilds() {
		// this.references.forEach(ref => {
		// 	ref.clear()
		// })
	}
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: "#EEE",
		flex: 1,
		justifyContent: "space-between"
	},
	content: {
		marginTop: 10
	},
	row: {
		flexDirection: "row"
	},
	column: {
		flexDirection: "column",
		alignItems: "flex-end"
	},
	buttonCenter: {
		marginTop: 5,
		padding: 2,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row"
	},
	input: {
		marginLeft: 5,
		marginRight: 5,
		flex: 1,
		padding: 0,
		paddingLeft: 2,
		height: 30,
		fontSize: 16,
		alignSelf: "stretch",
		borderBottomColor: "#48C9B0",
		color: "black",
		borderBottomWidth: 1
	},
	add: {
		backgroundColor: "#1A5276",
		height: 70,
		width: 150,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff"
	},
	back: {
		backgroundColor: "#CB4335",
		height: 70,
		width: 150,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff"
	},
	addText: {
		color: "#FFF",
		padding: 2,
		fontSize: 20
	},
	txt: {
		color: "#000",
		padding: 5,
		fontSize: 22
	},
	title: {
		fontSize: 30
	},
	subtitle: {
		fontSize: 12
	},
	icon: {
		color: "#fff"
	},
	button: {
		marginTop: 5,
		padding: 2
	},
	scroll: {
		alignSelf: "stretch"
	},
	profileText: {
		padding: 10,
		fontSize: 20,
		color: "#DDD",
		fontWeight: "bold"
	},
	mapStyle: {
		flex: 1
	},
	profileButton: {
		backgroundColor: "#424242",
		height: 70,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default AddLactente;
