import { Text, View } from "react-native";
import { useSessionStore } from "../session/sessionStore";
import Timer from "../components/Timer";


export default function Index() {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello world</Text>
      <Timer></Timer>
    </View>
  );
}
