import React from "react";
import { View } from "react-native";
import { Button, Text, VStack } from "@gluestack-ui/themed";
import { useSessionStore } from "../session/sessionStore";

const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const secs = s % 60

    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default function HistoryScreen() {
    const remaining = useSessionStore((state) => state.remaining)
    return (
        <VStack>
            <Text>Timer</Text>
            <Text> {formatTime(remaining)}</Text>
        </VStack>
    );
}