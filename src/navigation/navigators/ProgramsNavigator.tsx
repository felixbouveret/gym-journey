import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, HStack, IconButton } from 'native-base';

import usePrograms from '@/hooks/usePrograms';
import ProgramsCreation from '@/screens/Programs/ProgramsCreation';
import ProgramsExerciceModal from '@/screens/Programs/ProgramsExerciceModal';
import ProgramsList from '@/screens/Programs/ProgramsList';
import ProgramsSession from '@/screens/Programs/ProgramsSession';
import { RootStackParamList, RootTabScreenProps } from '@/types';
import { UID_V4 } from '@/types/Exercices.types';

export type ProgramsTabParamList = {
  Programs: undefined;
  ProgramsCreation: { id: UID_V4; editing?: boolean };
  ProgramsSession: { programId: UID_V4; sessionId: UID_V4; editing?: boolean };
  ProgramsExerciceModal: { programId: UID_V4; sessionId: UID_V4; stepId?: UID_V4 };
};

export type ProgramsTabScreenProps<Screen extends keyof ProgramsTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ProgramsTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

const Stack = createNativeStackNavigator<ProgramsTabParamList>();

export default function ProgramsNavigator({}: RootTabScreenProps<'ProgramsScreen'>) {
  const { onCreateProgram, onValidateProgram } = usePrograms();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Programs"
        component={ProgramsList}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              size="sm"
              variant={'solid'}
              onPress={() =>
                onCreateProgram((id) => navigation.navigate('ProgramsCreation', { id }))
              }
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
