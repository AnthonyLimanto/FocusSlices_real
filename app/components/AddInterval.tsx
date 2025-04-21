import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import {Picker} from '@react-native-picker/picker';
import WheelPickerExpo from 'react-native-wheel-picker-expo'; // Ensure this is the correct library
import { ItemType } from "react-native-wheel-picker-expo/lib/typescript/types";
// import { useSessionStore } from "../session/sessionStore"; // Uncomment and use when ready

const AddInterval = () => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(0); // default to 25
  const [title, setTitle] = useState("");

  const values: ItemType[] = Array.from({ length: 60 }, (_, i) => ({
    label: `${i + 1} min`,
    value: i + 1,
  }));

  const handleClose = () => setShowActionsheet(false);

  const handleSave = () => {
    if (!title.trim()) return;

    // TODO: Save to Zustand
    // addInterval({ title, mins: selectedMinutes });

    console.log("Saving interval:", { title, mins: selectedMinutes });
    setTitle("");
    setSelectedMinutes(25);
    handleClose();
  };

  return (
    <>
      <Button onPress={() => setShowActionsheet(true)}>
        <ButtonText>+ Add Interval</ButtonText>
      </Button>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose} snapPoints={[36]}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <Center>
            <VStack className="w-full pt-5 space-y-5">
              <Box style={{ width: "80%" }}>
                <Text style={{ marginBottom: 4, fontSize: 16 }}>Title</Text>
                <TextInput
                  placeholder="e.g. Focus, Break"
                  value={title}
                  onChangeText={setTitle}
                  style={{
                    fontSize: 16,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 8,
                  }}
                />
              </Box>

              <Box>
                <Text style={{ textAlign: "center", marginVertical: 8 }}>Select Minutes</Text>
                <WheelPickerExpo
                    items={values} // Use the array of ItemType objects
                    initialSelectedIndex={selectedMinutes - 1} // 0-based index
                    onChange={({ index, item }) => setSelectedMinutes(item.value)} // Use value from ItemType
                    height={180}
                    width={150}
                    renderItem={({ label, fontSize, fontColor, textAlign }) => (
                    <Text style={{ fontSize, color: fontColor, textAlign }}>{label}</Text>
                    )}
                />
              </Box>

              <Button onPress={handleSave}>
                <ButtonText>Save Interval</ButtonText>
              </Button>
            </VStack>
          </Center>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default AddInterval;
