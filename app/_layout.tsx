import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

export default function App() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					// backgroundColor: "#f4511e",
				},
				headerTintColor: "#000",
				headerTitleStyle: {
					fontWeight: "bold",
				},
				animation: "slide_from_right",
			}}
		>
			{/* <Stack.Screen
				name="home-router"
				options={{ animation: "slide_from_left" }}
			/> */}
		</Stack>
	);
}
