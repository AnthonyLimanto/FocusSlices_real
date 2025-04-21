import React from "react";
import { View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import { useSessionStore } from "../session/sessionStore";
import { Button, ButtonText } from "@/components/ui/button"
import { VStack} from "@/components/ui/vstack"
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";

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

    return (
        <VStack space="md">
            <Center>
                <Text>Timer</Text>
                <Text>{intervalsTitle[currentIndex]}</Text>
                <Text> {formatTime(remaining)}</Text>
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