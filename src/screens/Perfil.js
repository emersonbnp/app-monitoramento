import React, { Component } from "react";
import {
	TextInput,
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from "react-native";
import Header from "../components/Header";
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

class Perfil extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signedIn: false,
			checkedSignIn: false,
			firstName: "",
			lastName: "",
			email: ""
		};
	}

	componentDidMount() {
		this.rerender();
	}

	rerender() {
		AsyncStorage.getItem("parent").then(val => {
			console.log(val);
			this.setState({ parent: JSON.parse(val) });
		});
	}

	render() {
		try {
			console.log("render again");
			let parent;
			if (this.state.parent) {
				parent = (
					<View style={styles.content}>
						{/* <NavigationEvents onDidFocus={() => this.rerender()} /> */}
						<View style={styles.row}>
							<Text style={styles.txt}>Nome: </Text>
						</View>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								editable={false}
								value={this.state.parent.firstName}
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.txt}>Sobrenome: </Text>
						</View>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								editable={false}
								value={this.state.parent.lastName}
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.txt}>E-mail: </Text>
						</View>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								editable={false}
								value={JSON.stringify(this.state.parent.email)}
							/>
						</View>
					</View>
				);
			}

			return (
				<View style={styles.wrapper}>
					<Header />
					{parent}
					<View style={styles.buttonCenter}>
						<TouchableOpacity
							style={[styles.button, styles.back]}
							onPress={() => this.back(this.props.navigation)}
						>
							<FontAwesomeIcon
								icon={faBackward}
								style={styles.icon}
								size={26}
							/>
							<Text style={styles.addText}>Voltar</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		} catch (e) {
			console.log(e);
		}
	}

	async back(navigation) {
		navigation.navigate("Main");
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

export default Perfil;
