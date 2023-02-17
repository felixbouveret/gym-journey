import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Programs from "@/stacks/Programs/Programs";
import ProgramsCreation from "@/stacks/Programs/ProgramsCreation";
import ProgramsExerciceModal from "@/stacks/Programs/ProgramsExerciceModal";
import ProgramsSession from "@/stacks/Programs/ProgramsSession";
import { ProgramsTabParamList, RootTabScreenProps } from "@/types";

const Stack = createNativeStackNavigator<ProgramsTabParamList>();

export default function ProgramsScreen({}: RootTabScreenProps<"Programs">) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Programs" component={Programs} options={{}} />
      <Stack.Screen name="ProgramsCreation" component={ProgramsCreation} options={{}} />
      <Stack.Screen name="ProgramsSession" component={ProgramsSession} options={{}} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="ProgramsExerciceModal"
          component={ProgramsExerciceModal}
          options={{ title: "Nouvel exercice" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
