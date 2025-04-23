import React, { FC, useState } from "react";
import { Alert, Pressable, Text, View, StyleSheet } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { useSessionStore } from "../session/sessionStore";
import Svg, { Path } from "react-native-svg";
import { G } from 'react-native-svg';
import { ButtonText } from "@/components/ui/button";

interface PieChartTimer {
    radius?: number;
}
type Slice = {
    startAngle: number;
    sweepAngle: number;
    color: string;
    title: string
};


const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

const describeArc = (x, y, radius, startAngle, sweepAngle) => {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, startAngle + sweepAngle);
  
    const largeArcFlag = sweepAngle > 180 ? 1 : 0;
  
    return [
        `M ${x} ${y}`, // Move to center
        `L ${start.x} ${start.y}`, // Line to arc start
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, // Arc to end
        'Z', // Close the path (back to center)
    ].join(' ');
};

const getPieSlices = (intervals: number[], titles: string[]): Slice[] => {
    const totalTime = intervals.reduce((acc, curr) => acc + curr, 0); // Total minutes
    const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#A66DD4']; // Example color palette
  
    let currentAngle = 0;
    return intervals.map((interval, index) => {
      const sweepAngle = (interval / totalTime) * 360;
      const slice = {
        startAngle: currentAngle,
        sweepAngle,
        color: colors[index % colors.length], // Loop through colors
        title: titles[index]
      };
      currentAngle += sweepAngle;
      return slice;
    });
};

// TODO make prettier
const PieChartTimer: FC<PieChartTimer> = ({ radius = 150 }) => {
    const {remaining, startSession, resumeSession, pauseSession, isRunning, intervals, intervalsTitle, currentIndex} = useSessionStore();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const slices = getPieSlices(intervals, intervalsTitle);
    const center = radius;

	const handlePress = (event: any) => {
		const { locationX, locationY } = event.nativeEvent;
	
		// Calculate the difference between the touch point and the center
		const dx = locationX - center;
		const dy = locationY - center;
	
		// Calculate the angle in degrees (0-360) and ensure it's positive
		const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
		const normalizedAngle = (angle + 360) % 360; // Normalize to 0-360 degrees
	
		// Calculate the distance from the center
		const distance = Math.sqrt(dx * dx + dy * dy);
		console.log(`x: ${dx}, y ${dy}`);
		// Check if the touch is within the radius of the pie chart
		if (distance <= radius) {
			for (let i = 0; i < slices.length; i++) {
				const slice = slices[i];
	
				// Check if the angle falls within the slice's start and end angles
				if (
					normalizedAngle >= slice.startAngle &&
					normalizedAngle <= slice.startAngle + slice.sweepAngle
				) {
					setSelectedIndex(i);
					console.log(`Slice ${i} tapped`);
					return;
				}
			}
		}
	};
    return (
        <View style={styles.container}>
			<Pressable onPress={handlePress} onPressOut={() => setSelectedIndex(null)}>
				<Svg
					width={radius * 2}
					height={radius * 2}
					// onPress={handlePress} // Handle touch events
				>
					{slices.map((slice, i) => {
						const isSelected = selectedIndex === i;
						return (
							<Path
								key={i}
								d={describeArc(center, center, radius, slice.startAngle, slice.sweepAngle)}
								fill={isSelected ? darkenColor(slice.color, 0.2) : slice.color}
							/>
						);
					})}
				</Svg>

			</Pressable>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        position: "relative",
        width: 300,
        height: 300,
      },
      pressable: {
        position: 'absolute',
        backgroundColor: 'transparent',
      },
    });
const darkenColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
  
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

export default PieChartTimer;
