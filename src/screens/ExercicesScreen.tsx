import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, HStack, IconButton } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useDispatch } from 'react-redux';

import ExerciceModalScreen from '@/stacks/Exercices/ExerciceModalScreen';
import ExerciceSingle from '@/stacks/Exercices/ExerciceSingle';
import ExercicesList from '@/stacks/Exercices/ExercicesList';
import { removeExercice } from '@/store/Exercices';
import { ExercicesTabParamList, RootTabScreenProps } from '@/types';
import { UID_V4 } from '@/types/Exercices.types';

const Stack = createNativeStackNavigator<ExercicesTabParamList>();

export default function ExercicesScreen({}: RootTabScreenProps<'Exercices'>) {
  const dispatch = useDispatch();

  const onOptions = (navigation: any, id: UID_V4) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Modifier', 'Supprimer'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1) return navigation.navigate('ExerciceModal', { id });
        if (buttonIndex === 2) {
          dispatch(removeExercice(id));
          navigation.goBack();
        }
      }
    );
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
              onPress={() => navigation.navigate('ExerciceModal', {})}
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
        options={({ navigation, route }) => ({
          headerRight: () => (
            <IconButton
              size="sm"
              variant={'solid'}
              onPress={() => onOptions(navigation, route.params.id)}
              _icon={{
                as: Ionicons,
                name: 'ellipsis-vertical'
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
