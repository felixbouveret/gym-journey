import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, HStack, IconButton } from 'native-base';

import ExerciceModalScreen from '@/stacks/Exercices/ExerciceModalScreen';
import ExerciceSingle from '@/stacks/Exercices/ExerciceSingle';
import ExercicesList from '@/stacks/Exercices/ExercicesList';
import { ExercicesTabParamList, RootTabScreenProps } from '@/types';

const Stack = createNativeStackNavigator<ExercicesTabParamList>();

export default function ProgramsScreen({}: RootTabScreenProps<'Exercices'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExercicesList"
        component={ExercicesList}
        options={({ navigation }) => ({
          title: 'Vos exercices',
          headerRight: () => (
            <IconButton
              size="sm"
              variant={'solid'}
              onPress={() => navigation.navigate('ExerciceModal')}
              _icon={{
                as: Ionicons,
                name: 'add'
              }}
            />
          )
        })}
      />
      <Stack.Screen
        name="ExerciceSingle"
        component={ExerciceSingle}
        options={({ navigation }) => ({
          title: 'Vos exercices',
          headerRight: () => (
            <IconButton
              size="sm"
              variant={'solid'}
              onPress={() => navigation.navigate('ExerciceModal')}
              _icon={{
                as: Ionicons,
                name: 'add'
              }}
            />
          )
        })}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ExerciceModal"
          component={ExerciceModalScreen}
          options={{
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
