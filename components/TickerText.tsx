import { View, Text, StyleSheet, TextProps } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
	Easing,
	interpolate,
	ReduceMotion,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
	cancelAnimation,
	Extrapolation,
} from "react-native-reanimated";

const numbersToNice = [...Array(10).keys()];
const stagger = 80;

const Tick = ({
	children,
	style,
	fontSize,
	...rest
}: TextProps & { fontSize: number }) => {
	return (
		<Text {...rest} style={[style, { fontSize }]}>
			{children}
		</Text>
	);
};

type TickerListProps = {
	number: number;
	index: number;
	fontSize: number;
};

const TickerList = ({ fontSize, number, index }: TickerListProps) => {
	const animatedValue = useSharedValue(0);
	const lineHeight = fontSize * 1.1;
	const output = numbersToNice.map((n) => -1 * lineHeight * n);

	useEffect(() => {
		animatedValue.value = withDelay(
			index * stagger,
			withTiming(number, {
				easing: Easing.bezier(0.85, 0, 0.15, 1),
				reduceMotion: ReduceMotion.System,
			})
		);

		return () => {
			cancelAnimation(animatedValue);
		};
	}, [number]);

	const animatedViewStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						animatedValue.value,
						numbersToNice,
						output,
						Extrapolation.EXTEND
					),
				},
			],
		};
	}, [animatedValue.value]);

	return (
		<View style={[{ height: fontSize }, styles.overflowH]}>
			<Animated.View style={[animatedViewStyle]}>
				{numbersToNice.map((number, index) => (
					<Tick
						key={`number-${number}-index-${index}`}
						fontSize={fontSize}
						style={{
							fontVariant: ["tabular-nums"],
							lineHeight,
						}}
					>
						{number}
					</Tick>
				))}
			</Animated.View>
		</View>
	);
};

type TickerProps = {
	value: number;
	fontSize?: number;
};
const Ticker = ({ value, fontSize = 50 }: TickerProps) => {
	const [newFontSize, setNewFontSize] = useState(fontSize);
	const intFormat = Intl.NumberFormat("tr-TR", {
		currency: "TRY",
		style: "currency",
	}).format(value);

	const viewingValue = intFormat;
	const splittedValue = viewingValue.toString().split("");

	return (
		<View>
			<Tick
				fontSize={fontSize}
				adjustsFontSizeToFit
				numberOfLines={1}
				style={styles.absoluteTicker}
				onTextLayout={({ nativeEvent }) => {
					let line = nativeEvent.lines[0];
					setNewFontSize(line.ascender);
				}}
			>
				{viewingValue}
			</Tick>
			{newFontSize && !isNaN(newFontSize) && (
				<View style={styles.textContainer}>
					{splittedValue.map((text, index) => {
						const key = [text, index].join("-");
						if (!isNaN(parseInt(text))) {
							return (
								<TickerList
									key={key}
									index={index}
									fontSize={newFontSize}
									number={Number(text)}
								/>
							);
						}
						return (
							<Tick key={index} fontSize={newFontSize}>
								{text}
							</Tick>
						);
					})}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	absoluteTicker: {
		position: "absolute",
		left: 1000,
		top: 1000,
		zIndex: -1,
	},
	textContainer: { flexDirection: "row", alignItems: "center" },
	overflowH: {
		overflow: "hidden",
	},
});

export { Ticker, TickerProps };
