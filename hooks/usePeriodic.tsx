import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";

const usePeriodic = (callback: Function, delay: number) => {
	const savedCallback = useRef<Function | null>();

	// Callback'i kaydetmek için.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Döngü başlatmak için.
	useEffect(() => {
		function tick() {
			if (savedCallback.current) {
				savedCallback.current();
			}
		}

		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};

export { usePeriodic };
