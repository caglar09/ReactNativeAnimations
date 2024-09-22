import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import { Ticker } from "../../components";
import { usePeriodic } from "../../hooks";

const TickerText = () => {
	const [value, setValue] = useState(0);

	const randomize = () => setValue(Math.random() * 10000);
	usePeriodic(randomize, 3000);
	// useEffect(() => {
	// 	randomize();
	// }, []);

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTitle: "Ticker Text",
					headerBackTitleVisible: false,
				}}
			/>

			<Ticker value={value} fontSize={80} />

			<Button onPress={randomize} title="Change Value" />
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

export default TickerText;
