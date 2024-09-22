import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

const animationList = [
	{
		title: "Modal Animation",
		href: "modal-animation",
	},
	{
		title: "Ticker Text",
		href: "ticker-text",
	},
];

const HomeRouter = () => {
	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTitle: "Home",
				}}
			/>
			{animationList.map((item) => (
				<Link href={item.href} key={item.title} style={{ margin: 10 }}>
					<Text>{item.title}</Text>
				</Link>
			))}
			{/* <Link href={{ pathname: "modal-animation" }}>Go to Modal Animation</Link> */}
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
