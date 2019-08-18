import React, { Component } from "react";
import {
	TextInput,
	View,
	StyleSheet,
	Text,
	Image
} from "react-native";
import Header from "../components/Header";
import params from "../params";
import axios from "axios";
import { NavigationEvents } from "react-navigation";
import Moment from "moment";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import CustomButton from '../components/general/custom-button'


class VisualizarLactente extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: false,
			checkedSignIn: false,
			firstName: "",
			lastName: "",
			weight: "",
			birthday: "",
			device: "",
			bpm: "0",
			ox: "0",
			temp: "0",
			pos: "PRONE",
			baby_position_icon: baby_up
		};
	}

	componentDidMount() {
		this.rerender();
		this.timer = setInterval(() => this.getVitalSigns(), 1000);
	}

	rerender() {
		const { navigation } = this.props;
		if (navigation && navigation.getParam("infant", undefined)) {
			this.setState({ infant: navigation.getParam("infant") });
		}
	}

	render() {
		try {
			let infant;
			if (this.state.infant) {
				infant = (
					<View style={styles.content}>
						<NavigationEvents onDidFocus={() => this.rerender()} />
						<View style={styles.row}>
							<View style={styles.block}>
								<Image
									style={styles.img}
									source={require("./../../assets/imgs/heart.png")}
								/>
								<Text style={styles.txtblock}>
									{" "}
									{this.state.bpm}{" "}
								</Text>
							</View>
							<View style={styles.block}>
								<Image
									style={styles.img}
									source={require("./../../assets/imgs/lung.png")}
								/>
								<Text style={styles.txtblock}>
									{" "}
									{this.state.ox}{" "}
								</Text>
							</View>
							<View style={styles.block}>
								<Image
									style={styles.img}
									source={require("./../../assets/imgs/temperature.png")}
								/>
								<Text style={styles.txtblock}>
									{" "}
									{this.state.temp}{" "}
								</Text>
							</View>
							<View style={styles.block}>
								<Image
									style={styles.img}
									source={this.state.baby_position_icon}
								/>
							</View>
						</View>
						<View style={styles.txt} style={styles.row}>
							<Text style={styles.txt}>Nome: </Text>
						</View>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								editable={false}
								value={
									this.state.infant.firstName +
									" " +
									this.state.infant.lastName
								}
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.txt}>Peso: </Text>
						</View>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								editable={false}
								value={JSON.stringify(this.state.infant.weight)}
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.txt}>Data Nascimento: </Text>
						</View>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								editable={false}
								value={Moment(
									this.state.infant.birthday
								).format("DD/MM/YYYY")}
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.txt}>Dispositivo: </Text>
						</View>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								editable={false}
								value={this.state.infant.device}
							/>
						</View>
					</View>
				);
			}

			return (
				<View style={styles.wrapper}>
					<Header />
					{infant}
					<View style={styles.buttonCenter}>
						<CustomButton
							onPress={() => this.back(this.props.navigation)}
							color={"#C0392B"}
							width={150}
							height={60}
							label="Voltar"
							icon={faBackward}
						/>
					</View>
				</View>
			);
		} catch (e) {
			console.error('Debug: ', e);
		}
	}

	async back(navigation) {
		navigation.navigate("Main");
	}

	async add(navigation) {
		var url = params.url + "/infant/" + this.state.id;
		var data = new FormData();
		data.append("firstName", this.state.firstName);
		data.append("lastName", this.state.lastName);
		data.append("weight", this.state.weight);
		data.append("birthday", this.state.birthday);
		data.append("device", this.state.device);
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
						console.error('Debug: ', e);
					});
			})
			.catch(e => {
				console.error('Debug: ', e);
			});
	}

	async getVitalSigns() {
		if (this.state.infant && this.state.infant.device) {
			var url = params.url + "/vital-sign/" + this.state.infant.device;
			axios
				.get(url)
				.then(resp => {
					this.setState({ bpm: JSON.stringify(resp.data.heartRate) });
					this.setState({
						ox: JSON.stringify(resp.data.oxygenLevel)
					});
					this.setState({
						temp: JSON.stringify(resp.data.temperature)
					});
					this.setState({ pos: resp.data.breaststroke });
					if (this.state.pos == false) {
						this.setState({ baby_position_icon: baby_up });
					} else {
						this.setState({ baby_position_icon: baby_down });
					}
				})
				.catch(e => {
					console.log('Debug: ', e);
				});
		}
	}
}

const baby_up = require("./../../assets/imgs/baby-up.png");
const baby_down = require("./../../assets/imgs/baby-down.png");

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: "#EEE",
		flex: 1,
		justifyContent: "space-between"
	},
	block: {
		width: 64,
		height: 64,
		flex: 1
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
		padding: 10,
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
		fontSize: 20,
		fontWeight: "bold"
	},
	txt: {
		color: "#000",
		padding: 5,
		fontSize: 22,
		fontWeight: "bold"
	},
	txtblock: {
		color: "yellow",
		fontSize: 28,
		padding: 7,
		fontWeight: "bold",
		position: "absolute",
		textShadowColor: "black",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 40,
		shadowOpacity: 100
	},
	title: {
		fontSize: 30,
		fontWeight: "bold"
	},
	subtitle: {
		fontSize: 12,
		fontWeight: "bold"
	},
	button: {
		marginTop: 10,
		padding: 5
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
	icon: {
		color: "#fff",
		fontWeight: "bold"
	},
	profileButton: {
		backgroundColor: "#424242",
		height: 70,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default VisualizarLactente;
