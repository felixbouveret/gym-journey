import { Box, Button, VStack } from "native-base";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { createProgram } from "@/store/Programs";
import { ProgramsTabScreenProps } from "@/types";

export default function ProgramsScreen({ navigation }: ProgramsTabScreenProps<"Programs">) {
  const dispatch = useDispatch();
  const { programs } = useSelector((state: RootState) => state.programs);

  const onPress = async () => {
    Alert.prompt("Nouveau programme", "Nom du programme", [
      {
        text: "Annuler",
        style: "cancel"
      },
      {
        text: "Créer",
        onPress: (name) => {
          //create program
          navigation.navigate("ProgramsCreation", { name: name ? name : "Sans nom" });
          dispatch(createProgram(name ? name : "Sans nom"));
        }
      }
    ]);
  };

  return (
    <VStack justifyContent={"center"} alignItems="center" h="full" w="full">
      <Box>Vos programmes</Box>
      {programs.map((program, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => navigation.navigate("ProgramsCreation", { name: program.name })}
        >
          <Box>{program.name}</Box>
        </TouchableWithoutFeedback>
      ))}
      <Button onPress={onPress}>To prog</Button>
    </VStack>
  );
}
