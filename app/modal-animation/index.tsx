import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedModal, FabButton } from "../../components";
import { Stack } from "expo-router";
import { useSharedValue } from "react-native-reanimated";

const ModalAnimation = () => {
	const [modalVisible, setModalVisible] = React.useState(false);

	const modalValue = useSharedValue(0);

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerTitle: "Modal Animation",
					headerBackTitleVisible: false,
				}}
			/>
			<FabButton onPress={() => setModalVisible(!modalVisible)} />
			<AnimatedModal
				visible={modalVisible}
				value={modalValue}
				onRequestClose={() => setModalVisible(!modalVisible)}
			/>
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

export default ModalAnimation;
