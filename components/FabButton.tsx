import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const FabButton: React.FC<{
	onPress?: () => void;
}> = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.fab} onPress={onPress}>
			<Text style={styles.plus}>+</Text>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		bottom: 60,
		backgroundColor: "#0f0f0f",
		justifyContent: "center",
		alignItems: "center",
		width: 72,
		height: 72,
		borderRadius: 36,
	},
	plus: {
		fontSize: 36,
		lineHeight: 0,
		color: "#fff",
	},
});

export { FabButton };
