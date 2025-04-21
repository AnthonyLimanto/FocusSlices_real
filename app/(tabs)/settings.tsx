import { View, Text } from "react-native";
import AddInterval from "../components/AddInterval";

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
            <AddInterval></AddInterval>
        </View>
    );
}