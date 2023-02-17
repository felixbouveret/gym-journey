import { Box, Button, VStack } from "native-base";
import { useEffect } from "react";
import { Alert } from "react-native";

import { ProgramsTabScreenProps } from "@/types";

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<"ProgramsCreation">) {
  useEffect(() => {
    navigation.setOptions({
      title: route.params?.name
    });
  }, [route.params?.name]);

  const onPress = async () => {
    Alert.prompt("Nouveau programme", "Nom du programme", [
      {
        text: "Annuler",
        style: "cancel"
      },
      {
        text: "Créer",
        onPress: (sessionName) => {
          //create program
          navigation.navigate("ProgramsSession", {
            sessionName: sessionName ? sessionName : "Sans nom"
          });
        }
      }
    ]);
  };

  return (
    <VStack justifyContent={"center"} alignItems="center" h="full" w="full">
      <Box>ProgramsCreationScreen</Box>
      <Button onPress={onPress}>To prog</Button>
    </VStack>
  );
}
