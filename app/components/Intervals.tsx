import React, { FC } from "react";
import { Text } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";

interface IntervalProps {
  title: string;
  mins: number;
}
// TODO make prettier
const Interval: FC<IntervalProps> = ({ title, mins }) => {
  return (
    <Box>
        <Center>
            <HStack space="md">
                <Text>{title}</Text>
                <Text>:</Text>
                <Text>{mins} mins</Text>
            </HStack>
        </Center>
    </Box>
  );
};

export default Interval;