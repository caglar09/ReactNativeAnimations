import { View, Text } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

const HomeRouter = () => {
	return (
		<View>
			<Stack.Screen
				options={{
					headerTitle: "Home",
				}}
			/>
			<Link href={{ pathname: "modal-animation" }}>Go to Modal Animation</Link>
		</View>
	);
};

export default HomeRouter;
