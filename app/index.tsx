import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

const HomeRouter = () => {
	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTitle: "Home",
				}}
			/>
			<Link href={{ pathname: "modal-animation" }}>Go to Modal Animation</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default HomeRouter;
