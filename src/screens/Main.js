import React, { Component } from "react";
import {
	BackHandler,
	ScrollView,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Image
} from "react-native";
import Header from "../components/Header";
import params from "../params";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../components/general/custom-button";

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: false,
			checkedSignIn: false
		};
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

		AsyncStorage.getItem("id").then(codigo => {
			this.setState({ signedIn: true });
			axios
				.get(params.url + "/parent/" + codigo)
				.then(resp => {
					this.setState({ infants: resp.data.infants });
				})
				.catch(e => {
					console.log('Debug: ', e);
				});
		});
	}

	goToInfant(navigation, infant) {
		try {
			navigation.navigate("VisualizarLactente", { infant: infant });
		} catch (e) {
			console.erroror(e);
		}
	}

	render() {
		try {
			let kids = [];
			const { navigation } = this.props;
			if (navigation && navigation.getParam("infants", undefined)) {
				this.state.infants = navigation.getParam("infants");
			}
			if (this.state.infants) {
				this.state.infants.forEach(infant => {
					kids.push(
						<TouchableOpacity
							style={styles.content}
							key={infant.id}
							onPress={() => {
								this.goToInfant(this.props.navigation, infant);
							}}
						>
							<Image
								style={styles.img}
								source={require("./../../assets/imgs/baby.png")}
							/>
							<View key={infant.id}>
								<Text style={styles.txt}>
									{infant.firstName + " " + infant.lastName}
								</Text>
							</View>
						</TouchableOpacity>
					);
				});
			} else {
				<View key={1}>
					<Text style={styles.profileText}>
						Nenhum lactente cadastrado.
					</Text>
				</View>;
			}
			return (
				<View style={styles.wrapper}>
					<Header />
					<ScrollView>
						<View style={styles.outer}>{kids}</View>
					</ScrollView>
					<View style={styles.buttonCenter}>
						<CustomButton
							onPress={() =>
								this.props.navigation.navigate("AdicionarLactente")
							}
							color={"#1A5276"}
							width={300}
							height={40}
							label="Adicionar Lactente"
							icon={faPlusCircle}
						/>
					</View>
					<View>
						<TouchableOpacity
							style={[styles.button, styles.profileButton]}
							onPress={() => {
								this.props.navigation.navigate("Profile", {
									parent: this.state.parent
								});
							}}
						>
							<Text style={styles.profileText}>Perfil</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} catch (e) {
			console.log('Debug: ', e);
		}
	}
}

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: "#D5DBDB",
		flex: 1,
		justifyContent: "space-between"
	},
	outer: {
		justifyContent: "center",
		alignItems: "center"
	},
	content: {
		marginTop: 20,
		width: 250,
		height: 250,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#5D6D7E",
		backgroundColor: "#F0F3F4",
		borderRadius: 15,
		borderWidth: 5
	},
	img: {
		flex: 1,
		aspectRatio: 0.7,
		resizeMode: "contain"
	},
	row: {
		flexDirection: "row"
	},
	buttonCenter: {
		alignItems: "center",
		justifyContent: "center"
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
	txt: {
		padding: 10,
		fontSize: 22,
		color: "#000000",
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

export default Main;
