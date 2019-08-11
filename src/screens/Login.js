import React, { Component } from "react";
import {
	BackHandler,
	Alert,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Header from "../components/Header";
import params from "../params";
import axios from "axios";
import OneSignal from "react-native-onesignal"; // Import package from node modules
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
class Login extends Component {
	state = {
		usuario: "",
		senha: "",
		userid: ""
	};

	constructor(props) {
		super(props);
		OneSignal.init("e343031b-ccc7-44f2-aa67-0bec9402010b", {
			kOSSettingsKeyAutoPrompt: true
		});
		OneSignal.addEventListener("received", this.onReceived);
		OneSignal.addEventListener("opened", this.onOpened);
		OneSignal.addEventListener("ids", this.onIds);
		OneSignal.getPermissionSubscriptionState(status => {
			userID = status.userId;
			this.setState({ userid: userID });
		});
	}

	onReceived(notification) {
		console.log("Notification received: ", notification);
	}

	onOpened(openResult) {
		console.log("Message: ", openResult.notification.payload.body);
		console.log("Data: ", openResult.notification.payload.additionalData);
		console.log("isActive: ", openResult.notification.isAppInFocus);
		console.log("openResult: ", openResult);
	}

	onIds(device) {
		console.log("Device info========================= ", device);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener(
			"hardwareBackPress",
			this.handleBackButton
		);
	}

	handleBackButton() {
		return true;
	}

	componentDidMount() {
		BackHandler.addEventListener(
			"hardwareBackPress",
			this.handleBackButton
		);
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<Header />
				<View style={styles.content}>
					<Text style={styles.title}>Login</Text>
					<Text style={styles.subtitle}>
						Entre com seu nome de usuário e senha ou cadastre-se!
					</Text>
					<View style={styles.row}>
						<Text style={styles.txt}>E-mail: </Text>
					</View>
					<View style={styles.row}>
						<TextInput
							style={styles.input}
							autoFocus={true}
							value={this.state.usuario}
							onChangeText={usuario => this.setState({ usuario })}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.txt}>Senha: </Text>
					</View>
					<View style={styles.row}>
						<TextInput
							secureTextEntry={true}
							style={styles.input}
							autoFocus={true}
							value={this.state.senha}
							onChangeText={senha => this.setState({ senha })}
						/>
					</View>
					<TouchableOpacity
						style={[styles.button, styles.bgHard]}
						onPress={() =>
							this.login(
								this.props.navigation,
								this.state.usuario,
								this.state.senha
							)
						}
					>
						<FontAwesomeIcon
							icon={faSignInAlt}
							style={styles.icon}
							size={32}
						/>
						<Text style={styles.buttonLabel}>Entrar</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate("SignUp", {
								userid: this.state.userid
							})
						}
					>
						<Text style={styles.subtitle}>
							Cadastre-se clicando aqui
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	async login(navigation, usuario, senha) {
		var url = params.url + "/auth/login";
		var data = new FormData();
		data.append("username", usuario);
		data.append("password", senha);
		data.append("userid", this.state.userid);
		axios
			.post(url, data)
			.then(resp => {
				console.log(resp.data);
				AsyncStorage.setItem("id", JSON.stringify(resp.data.codigo));
				AsyncStorage.setItem("parent", JSON.stringify(resp.data));
				navigation.navigate("Main");
			})
			.catch(e => {
				console.log(e);
				Alert.alert("Usuário e/ou senha inválidos!");
			});
	}
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: "#D5DBDB",
		flex: 1
	},
	content: {
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	txt: {
		color: "#000",
		fontSize: 22,
		fontWeight: "bold"
	},
	row: {
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
	title: {
		fontSize: 40,
		fontWeight: "bold"
	},
	subtitle: {
		padding: 10,
		fontSize: 16,
		fontWeight: "bold",
		justifyContent: "center"
	},
	button: {
		marginTop: 10,
		padding: 5
	},
	buttonLabel: {
		fontSize: 20,
		color: "#EEE",
		fontWeight: "bold",
		marginLeft: 10
	},
	icon: {
		color: "#EEE",
		fontWeight: "bold"
	},
	bgHard: {
		backgroundColor: "#1A5276",
		height: 70,
		width: 250,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff"
	}
});

export default Login;
