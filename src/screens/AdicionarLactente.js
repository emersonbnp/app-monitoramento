import React, { Component } from "react";
import {
	TextInput,
	View,
	StyleSheet,
	Text,
	ScrollView,
	Alert,
	DatePickerAndroid
} from "react-native";
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
import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid } from "react-native";

async function requestPermission() {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: "Solicitação de permissão de localização",
				message:
					"O aplicativo requer acesso à localização do seu dispositivo  " +
					"para disponibilizar para serviços médicos caso necessário.",
				buttonNeutral: "Ask Me Later",
				buttonNegative: "Cancel",
				buttonPositive: "OK"
			}
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log("You can use the location");
		} else {
			console.log("Location permission denied");
		}
	} catch (err) {
		console.warn(err);
	}
}

class AdicionarLactente extends Component {
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
				device: "",
				geolocation: {
					latitude: "",
					longitude: ""
				}
			},
			city: '',
			state: '',
			district: '',
			street: '',
			number: '',
			description: '',
			set_local: true
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
				state: this.state.infant.weight
			},
			{
				label: "Dispositivo",
				field: "device",
				state: this.state.infant.device
			}
			];
		}
		
	async pickDate() {
		try {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			const {action, year, month, day} = await DatePickerAndroid.open({
				date: new Date(yyyy, mm, dd),
				maxDate: new Date(yyyy, mm, dd)
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				console.log(year, month, day)
				this.setState(prevState => ({
					infant: {
						...prevState.infant,
						birthday: day.toString().padStart(2, '0') + 
						'/' + month.toString().padStart(2, '0') + 
						'/' + year.toString().padStart(2, '0')
					}
				}));
			}
		} catch ({code, message}) {
		console.warn('Cannot open date picker', message);
		}
	}
	componentDidMount() {
		AsyncStorage.getItem("id").then(result => {
			this.setState({ signedIn: true });
			this.setState({ id: JSON.parse(result) });
		});
	}
	
	getGeolocation() {
		requestPermission().then(() => {
			Geolocation.getCurrentPosition(this.success.bind(this));
		});
	}

	success(pos) {
		Alert.alert("Localização capturada com sucesso!");
		this.setState(prevState => ({
			infant: {
				...prevState.infant,
				geolocation: {
					...prevState.infant.geolocation,
					latitude: pos.coords.latitude
				}
			}
		}));
		this.setState(prevState => ({
			infant: {
				...prevState.infant,
				geolocation: {
					...prevState.infant.geolocation,
					longitude: pos.coords.longitude
				}
			}
		}));
	}

	handleTextChange(text, field) {
		this.setState({ infant: { ...this.state.infant, [field]: text } });
	}

	async back(navigation) {
		this.clearFields();
		navigation.navigate("Main");
	}

	async add(navigation) {
		var url = params.url + "/infant/" + this.state.id;
		var infant = new FormData();
		infant.append("firstName", this.state.infant.firstName);
		infant.append("lastName", this.state.infant.lastName);
		infant.append("weight", this.state.infant.weight);
		infant.append("birthday", this.state.infant.birthday);
		infant.append("device", this.state.infant.device);
		infant.append("latitude", this.state.infant.geolocation.latitude);
		infant.append("longitude", this.state.infant.geolocation.longitude);
		infant.append("city", this.state.city);
		infant.append("state", this.state.state);
		infant.append("district", this.state.district);
		infant.append("street", this.state.street);
		infant.append("number", this.state.number);
		infant.append("zipcode", this.state.zipcode);
		infant.append("description", this.state.description);
		axios
			.post(url, infant)
			.then(() => {
				axios
					.get(params.url + "/parent/" + this.state.id)
					.then(resp => {
						this.clearFields();
						navigation.navigate("Main", {
							infants: resp.data.infants
						});
					})
					.catch(e => {
						console.error("Debug: ", e);
					});
			})
			.catch(e => {
				console.error("Debug: ", e);
			});
	}

	setLocalizacao(navigation) {
		console.log(navigation.getParam("description", this.state.set_local))
		if (navigation.getParam("description", undefined) && this.state.set_local) {
			var city = navigation.getParam("city", undefined);
			var state = navigation.getParam("state", undefined);
			var district = navigation.getParam("district", undefined);
			var number = navigation.getParam("number", undefined);
			var zipcode = navigation.getParam("zipcode", undefined);
			var street = navigation.getParam("street", undefined);
			var latitude = navigation.getParam("latitude", undefined);
			var longitude = navigation.getParam("longitude", undefined);
			var description = navigation.getParam("description", undefined);
			console.log('DESC: ', description)
			this.setState({
				city: city
			});
			this.setState({
				description: description
			});
			this.setState({
				zipcode: zipcode
			});
			this.setState({
				state: state
			});
			this.setState({
				district: district
			});
			this.setState({
				street: street
			});
			this.setState({
				number: number
			});
			this.setState({
				zipcode: zipcode
			});
			this.setState(prevState => ({
				infant: {
					...prevState.infant,
					geolocation: {
						...prevState.infant.geolocation,
						latitude: latitude
					}
				}
			}));
			this.setState(prevState => ({
				infant: {
					...prevState.infant,
					geolocation: {
						...prevState.infant.geolocation,
						longitude: longitude
					}
				}
			}));
			this.setState({set_local: false})
		}
		console.log('geolocation -> ', this.state.infant.geolocation)
	}

	async pickLocation (navigation) {
        navigation.navigate('GooglePlaces', navigation)
    }

	render() {
		try {
			const { navigation } = this.props;
			if (navigation) {
				this.setLocalizacao(navigation)
			}
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
			elements.push(
			<View key={'bd-1'} style={styles.row}>
				<Text style={styles.txt}>Data de Nascimento: </Text>
			</View>)
			elements.push(
				<View key={'bd-2'} style={styles.row}>
					<TextInput 
						style={styles.input}
						value={this.state.infant.birthday}
						onTouchEnd={this.pickDate.bind(this)}
					/>
				</View>
			)
			elements.push(
				<View key={'end-1'} style={styles.row}>
					<Text style={styles.txt}>Endereço: </Text>
				</View>)
			elements.push(
				<View key={'end-2'} style={styles.row}>
					<TextInput ref={input => { this.enderecoInput = input }}
						style={styles.input}
						value={this.state.description}
						placeholder='rua e número'
						onTouchEnd={() => this.pickLocation(this.props.navigation)}
					/>
				</View>
			)

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
			console.log("Debug: ", e);
		}
	}

	clearFields() {
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

export default AdicionarLactente;
