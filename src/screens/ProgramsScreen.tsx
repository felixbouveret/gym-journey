import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'native-base';

import usePrograms from '@/hooks/usePrograms';
import ProgramsCreation from '@/stacks/Programs/ProgramsCreation';
import ProgramsExerciceModal from '@/stacks/Programs/ProgramsExerciceModal';
import ProgramsList from '@/stacks/Programs/ProgramsList';
import ProgramsSession from '@/stacks/Programs/ProgramsSession';
import { ProgramsTabParamList, ProgramsTabScreenProps, RootTabScreenProps } from '@/types';

const Stack = createNativeStackNavigator<ProgramsTabParamList>();

export default function ProgramsScreen({}: RootTabScreenProps<'ProgramsScreen'>) {
  const { onCreateProgram } = usePrograms();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Programs"
        component={ProgramsList}
        options={({ navigation }: ProgramsTabScreenProps<'Programs'>) => ({
          headerRight: () => (
            <IconButton
              size="sm"
              variant={'solid'}
              onPress={() => onCreateProgram(navigation)}
              _icon={{
                as: Ionicons,
                name: 'add'
              }}
            />
          )
        })}
      />
      <Stack.Screen name="ProgramsCreation" component={ProgramsCreation} options={{}} />
      <Stack.Screen name="ProgramsSession" component={ProgramsSession} options={{}} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ProgramsExerciceModal"
          component={ProgramsExerciceModal}
          options={{ title: 'Nouvel exercice' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
