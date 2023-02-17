import { Box, Button, VStack } from "native-base";
import { useEffect } from "react";

import { ProgramsTabScreenProps } from "@/types";

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<"ProgramsSession">) {
  useEffect(() => {
    navigation.setOptions({
      title: route.params?.sessionName
    });
  }, [route.params?.sessionName]);

  return (
    <VStack justifyContent={"center"} alignItems="center" h="full" w="full">
      <Box>ProgramsCreationScreen</Box>
      <Button onPress={() => navigation.navigate("ProgramsExerciceModal")}>+ exercice</Button>
    </VStack>
  );
}
