import React from "react";
import { View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import { useSessionStore } from "../session/sessionStore";
import { Button, ButtonText } from "@/components/ui/button"
import { VStack } from "@/components/ui/vstack"

const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const secs = s % 60

    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};


export default function Timer() {
    const {remaining, startSession, resumeSession, pauseSession} = useSessionStore();
    const handleStart = () => {
        const intervals = [1, 5, 25]; // durations in minutes
        startSession(intervals);
      };
    return (
        <VStack space="md">
            <Text>Timer</Text>
            <Text> {formatTime(remaining)}</Text>
            <Button size="md" variant="solid" action="primary" onPress={handleStart}>
                <ButtonText>Start Session</ButtonText>
            </Button>
        </VStack>
    );
}