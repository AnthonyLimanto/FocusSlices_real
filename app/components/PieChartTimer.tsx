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
    return (
        <View style={styles.container}>
          <Svg width={radius * 2} height={radius * 2}>
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
          {/* Middle hit box */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle / 2;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + (radius / 2) * Math.cos(radians);
            const y = center + (radius / 2) * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("Slice tapped or clicked!");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              />
            );
          })}
          {/* Middle hit box middle */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.25;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + (radius / 2) * Math.cos(radians);
            const y = center + (radius / 2) * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("Slice tapped or clicked!");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              />
            );
          })}
          {/* Middle hit box middle last */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.75;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + (radius / 2) * Math.cos(radians);
            const y = center + (radius / 2) * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("Slice tapped or clicked!");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              />
            );
          })}
          {/* start angle hit box */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + 5;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("start angle hit box");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              />
            );
          })}
          {/* start angle hit box middle */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + 4;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + (radius / 2) * Math.cos(radians);
            const y = center + (radius / 2) * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("start angle hit box");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              />
            );
          })}
          {/* Middle Edge hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle / 2;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("Middle Edge");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              />
            );
          })}
          {/* End angle Edge hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle - 5;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("End angle Edge hitbox");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              />
            );
          })}
          {/* 1st quarter angle Edge hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle / 4;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("1st quarter angle Edge hitbox");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              />
            );
          })}
          {/* 1st quarter angle middle hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle / 4;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + (radius / 2) * Math.cos(radians);
            const y = center + (radius / 2) * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log(" 1st quarter angle middle hitbox");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
              />
            );
          })}
          {/* 3rd quarter angle Edge hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.75;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log("3rd quarter angle Edge hitbox");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              />
            );
          })}
          {/* 3rd quarter angle middle hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.75;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + (radius / 2) * Math.cos(radians);
            const y = center + (radius / 2) * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log(" 3rd quarter angle middle hitbox ");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
              />
            );
          })}

          {/* 3rd quarter angle middle hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.8;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log(" 3rd quarter angle middle hitbox ");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
              />
            );
          })}
          {/* 3rd quarter angle middle hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.2;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log(" 3rd quarter angle middle hitbox ");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
              />
            );
          })}
          {/* 3rd quarter angle middle hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.3;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log(" 3rd quarter angle middle hitbox ");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
              />
            );
          })}
          {/* 3rd quarter angle middle hitbox */}
          {slices.map((slice, i) => {
            const angle = slice.startAngle + slice.sweepAngle * 0.4;
            const radians = (angle - 90) * (Math.PI / 180);
            const x = center + radius * Math.cos(radians);
            const y = center + radius * Math.sin(radians);
    
            return (
              <Pressable
                key={i}
                onPressIn={() => {
                  console.log(" 3rd quarter angle middle hitbox ");
                  setSelectedIndex(i);
                }}
                onPressOut={() => setSelectedIndex(null)}
                style={[
                  styles.pressable,
                  {
                    left: x,
                    top: y,
                  },
                ]}
                hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
              />
            );
          })}
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
        position: "absolute",
        width: 30,
        height: 30,
        marginLeft: -15,
        marginTop: -15,
        backgroundColor: "transparent",
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