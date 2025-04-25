import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import { useSessionStore } from "../session/sessionStore";
import { Button, ButtonText } from "@/components/ui/button"
import { VStack} from "@/components/ui/vstack"
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import PieChartTimer from "./PieChartTimer";
import { Audio } from 'expo-av';

const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const secs = s % 60

    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};


  

export default function Timer() {
    const {remaining, startSession, resumeSession, pauseSession, isRunning, intervals, intervalsTitle, currentIndex} = useSessionStore();
    const handleStart = () => {
        startSession(intervals);
      };

    const handlePause = () => {
        pauseSession();
    };

    const handleResume = () => {
        resumeSession();
    };

    useEffect(() => {
        let sound: Audio.Sound | null = null; // Track the sound object
        let isMounted = true; // Flag to prevent race conditions
    
        const playSound = async () => {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    require('../../assets/sounds/s3_spring_rain.mp3')
                );
                if (!isMounted) {
                    // If the component is unmounted, unload the sound immediately
                    await newSound.unloadAsync();
                    return;
                }
                sound = newSound; // Assign the sound object to the variable
                await sound.playAsync();
            } catch (error) {
                console.error('Error playing sound:', error);
            }
        };
    
        if (isRunning) {
            playSound();
        }
    
        // Cleanup function to unload the sound
        return () => {
            isMounted = false; // Prevent further actions if the component is unmounted
            if (sound) {
                try {
                    sound.unloadAsync(); // Ensure the sound is unloaded
                } catch (error) {
                    console.error('Error unloading sound:', error);
                }
            }
        };
    }, [currentIndex]);

    return (
        <VStack space="md">
            <Center>
                <Text>Timer</Text>
                <Text>{intervalsTitle[currentIndex]}</Text>
                <Text> {formatTime(remaining)}</Text>
                <PieChartTimer></PieChartTimer>
                <HStack space="md">
                    {remaining === 0 ? (
                        <Button size="md" variant="solid" action="primary" onPress={handleStart}>
                            <ButtonText>Start Session</ButtonText>
                        </Button>
                        ) : isRunning ? (
                        <Button size="md" variant="solid" action="primary" onPress={handlePause}>
                            <ButtonText>Pause Session</ButtonText>
                        </Button>
                        ) : (
                            <Button size="md" variant="solid" action="primary" onPress={handleResume}>
                                <ButtonText>Resume Session</ButtonText>
                            </Button>
                        )
                    }
                </HStack>
            </Center>
        </VStack>
    );
}