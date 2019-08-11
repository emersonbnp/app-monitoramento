import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faBackward,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomButton({
	onPress,
  color = "#CB4335",
  width = 150,
  height = 70,
	label = "Click me",
	buttonStyle = styles.button,
  textColor = styles.text,
  icon = faBackward,

}) {
	return (
		<TouchableOpacity style={[buttonStyle, {backgroundColor: color, width: width, height: height}]} onPress={onPress}>
			<FontAwesomeIcon icon={icon} style={styles.icon} size={26} />
			<Text style={textColor}>{label.toUpperCase()}</Text>
		</TouchableOpacity>
	);
}

CustomButton.propTypes = {
  color: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
	onPress: PropTypes.func.isRequired,
	label: PropTypes.string,
	buttonStyle: PropTypes.any,
  textColor: PropTypes.any,
  icon: PropTypes.any,
  iconColor: PropTypes.any
};

const styles = StyleSheet.create({
	text: {
		color: "#FFF",
    fontSize: 16,
    marginLeft: 5
  },
  icon: {
		color: "#EEE",
		fontWeight: "bold"
  },
  button: {
    flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff"
	},
});
