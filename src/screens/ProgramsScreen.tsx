import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, HStack, IconButton } from 'native-base';

import usePrograms from '@/hooks/usePrograms';
import ProgramsCreation from '@/stacks/Programs/ProgramsCreation';
import ProgramsExerciceModal from '@/stacks/Programs/ProgramsExerciceModal';
import ProgramsList from '@/stacks/Programs/ProgramsList';
import ProgramsSession from '@/stacks/Programs/ProgramsSession';
import { ProgramsTabParamList, RootTabScreenProps } from '@/types';

const Stack = createNativeStackNavigator<ProgramsTabParamList>();

export default function ProgramsScreen({}: RootTabScreenProps<'ProgramsScreen'>) {
  const { onCreateProgram, onValidateProgram } = usePrograms();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Programs"
        component={ProgramsList}
        options={() => ({
          headerRight: () => (
            <IconButton
              size="sm"
              variant={'solid'}
              onPress={onCreateProgram}
              _icon={{
                as: Ionicons,
                name: 'add'
              }}
            />
          )
        })}
      />
      <Stack.Screen
        name="ProgramsCreation"
        component={ProgramsCreation}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <IconButton
              size="sm"
              variant={'solid'}
              onPress={() => {
                onValidateProgram(route.params.id, () => navigation.goBack());
              }}
              _icon={{
                as: Ionicons,
                name: 'checkmark'
              }}
            />
          )
        })}
      />
      <Stack.Screen name="ProgramsSession" component={ProgramsSession} options={{}} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ProgramsExerciceModal"
          component={ProgramsExerciceModal}
          options={{
            gestureEnabled: false,
            header: ({ navigation }) => (
              <HStack backgroundColor={'white'} justifyContent="flex-end" py={2} px={4}>
                <Button onPress={navigation.goBack} variant={'unstyled'}>
                  Annuler
                </Button>
              </HStack>
            )
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
