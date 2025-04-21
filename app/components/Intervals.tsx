import React, { FC } from "react";
import { Text } from "react-native";
import { Box } from "@/components/ui/box";

interface IntervalProps {
  title: string;
  mins: number;
}
// TODO make prettier
const Interval: FC<IntervalProps> = ({ title, mins }) => {
  return (
    <Box>
      <Text>{title}: {mins} mins</Text>
    </Box>
  );
};

export default Interval;