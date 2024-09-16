import { BlurView, BlurViewProps } from "@react-native-community/blur";
import React from "react";
import {
	Dimensions,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	Easing,
	interpolate,
	ReduceMotion,
	runOnJS,
	SharedValue,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

type AnimatedModalProps = {
	visible: boolean;
	value: SharedValue<Number>;
	onRequestClose: () => void;
};

const dimension = Dimensions.get("screen");
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const zeroToOneInputRange = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const AnimatedModal: React.FC<AnimatedModalProps> = ({
	value,
	visible,
	onRequestClose,
}) => {
	const animVal = useSharedValue(0);

	// #region Modal background blur animation
	const startAnim = () => {
		animVal.value = withTiming(1, {
			duration: 250,
			easing: Easing.inOut(Easing.linear),
			reduceMotion: ReduceMotion.System,
		});
	};

	const resetAnim = (callback?: () => void) => {
		animVal.value = withTiming(
			0,
			{
				duration: 250,
				easing: Easing.inOut(Easing.linear),
			},
			(finished) => {
				if (callback) {
					runOnJS(callback)();
				}
			}
		);
	};

	const handleClose = () => {
		resetAnim(onRequestClose);
	};

	const animatedBlurViewProps = useAnimatedProps<BlurViewProps>(() => {
		return {
			blurAmount: interpolate(animVal.value, [0, 1], [0, 2]),
		};
	}, [animVal.value]);

	// #endregion

	// #region Modal content animation
	const animatedContentStyles = useAnimatedStyle(() => {
		const contentWidth = dimension.width - dimension.width * 0.075;
		const contentHeight = 350;

		const outputWidth = new Array(zeroToOneInputRange.length)
			.fill(contentWidth)
			.map((num, index) => {
				return num * zeroToOneInputRange[index];
			});

		const outputHeight = new Array(zeroToOneInputRange.length)
			.fill(contentHeight)
			.map((num, index) => {
				return num * zeroToOneInputRange[index];
			});

		return {
			opacity: interpolate(
				animVal.value,
				zeroToOneInputRange,
				[0, 0.3, 0.4, 0.6, 0.8, 1, 1, 1, 1, 1, 1]
			),
			width: interpolate(animVal.value, zeroToOneInputRange, outputWidth),
			height: interpolate(animVal.value, zeroToOneInputRange, outputHeight),
		};
	}, [animVal.value]);
	// #endregion
	return (
		<Modal
			animationType="none"
			transparent={true}
			visible={visible}
			statusBarTranslucent
			onShow={startAnim}
			onRequestClose={handleClose}
		>
			<AnimatedBlurView
				style={styles.background}
				blurType="light"
				animatedProps={animatedBlurViewProps}
			/>

			<View style={styles.container}>
				<Animated.View style={[styles.content, animatedContentStyles]}>
					<TouchableOpacity onPress={handleClose}>
						<Text style={styles.text}>Close</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: "7.5%",
	},
	background: {
		position: "absolute",
		zIndex: -1,
		width: "100%",
		height: "100%",
	},
	content: {
		width: "100%",
		height: 350,
		backgroundColor: "black",
		borderRadius: 40,
		padding: 20,
		position: "absolute",
		bottom: 60,
	},
	text: {
		color: "white",
	},
});

export { AnimatedModal };
