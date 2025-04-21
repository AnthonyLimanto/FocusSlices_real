import { View, Text } from "react-native";
import AddInterval from "../components/AddInterval";
import TimerSetup from "../components/TimerSetup";

export default function HistoryScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Placeholder</Text>
            <TimerSetup></TimerSetup>
        </View>
    );
}