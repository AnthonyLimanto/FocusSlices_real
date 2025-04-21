import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
  } from "@/components/ui/modal"
import { useSessionStore } from "../session/sessionStore";
import { VStack } from "@/components/ui/vstack";
import { FlatList, Text, View } from "react-native";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import Intervals from "./Intervals";
import { Button, ButtonText } from "@/components/ui/button";


// TODO set up a return a button that sets up a modal to set the intervals in session Store, set up interval picker componenet, set up interval component
// ui is edit alarm header
// overall duration
// 1st interval - text ie 10 mins, orrr  title of interval next to time like so -    1st Interval : 10 mins  (box plus text), click on interval will bring up time picker
// 2nd interval
// ..... list of interval scrollable, max of 5 for free
// 
// (+) - button add new interval
// [Save] - sets timer intervals go back to prev page, ie close modal


const renderInterval = ({ item }: { item: { title: string; mins: number } }) => (
	<Intervals title={item.title} mins={item.mins} />
  );
  

const combineIntervals = (intervals: number[], titles: string[]) => {
	return intervals.map((mins, index) => ({
		title: titles[index] || `Interval ${index + 1}`,
		mins,
		key: index.toString(),
	}));
}

const handleAddInterval = () => {
	
}

export default function TimerSetup() {
    const {intervals, intervalsTitle} = useSessionStore();
	const combineData = combineIntervals(intervals, intervalsTitle);
    return (
        <VStack>
          	<Center>
            	<Text>Edit Alarm</Text>
				<FlatList
					data={combineData}
					renderItem={renderInterval}
					keyExtractor={(item) => item.key}
					onEndReachedThreshold={0.5}
					ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
				/>
				<Button onPress={handleAddInterval}>
					<ButtonText> Add Interval</ButtonText>
				</Button>
          	</Center>
        </VStack>
    );
}
