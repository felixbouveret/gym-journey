import { Box, Button, VStack } from "native-base";
import { Alert } from "react-native";

import { ProgramsTabScreenProps } from "@/types";

export default function ProgramsScreen({ navigation }: ProgramsTabScreenProps<"Programs">) {
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
        }
      }
    ]);
  };

  return (
    <VStack justifyContent={"center"} alignItems="center" h="full" w="full">
      <Box>Vos programmes</Box>
      <Button onPress={onPress}>To prog</Button>
    </VStack>
  );
}
