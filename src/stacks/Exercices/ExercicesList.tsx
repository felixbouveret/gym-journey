import { Ionicons } from '@expo/vector-icons';
import {
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Text,
  VStack
} from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { removeExercice } from '@/store/Exercices';
import { ExercicesTabScreenProps } from '@/types';
import { UID_V4 } from '@/types/Exercices.types';

export default function ExercicesList({ navigation }: ExercicesTabScreenProps<'ExercicesList'>) {
  const dispatch = useDispatch();
  const { exercices } = useSelector((state: RootState) => state.exercices);

  const onOptions = (id: UID_V4) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Modifier', 'Supprimer'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1) return navigation.navigate('ExerciceModal', { id });
        if (buttonIndex === 2) return dispatch(removeExercice(id));
      }
    );

  const exercicesList = exercices?.map((item, index) => (
    <Pressable
      key={index}
      w="full"
      flex="1"
      onPress={() => navigation.navigate('ExerciceSingle', { id: item.id })}
    >
      <HStack
        space="4"
        p={4}
        pr="2"
        flex="1"
        backgroundColor={'white'}
        rounded={8}
        w="full"
        alignItems={'center'}
      >
        <VStack flex="1" space="2">
          <HStack alignItems="center" justifyContent={'space-between'}>
            <Text fontSize={'xl'} fontWeight="medium">
              {item.name}
            </Text>
            {item.isUnilateral && (
              <Badge>
                <Text>Unilatéral</Text>
              </Badge>
            )}
          </HStack>
        </VStack>
        <IconButton
          size="sm"
          p={1}
          onPress={() => onOptions(item.id)}
          _icon={{
            as: Ionicons,
            color: 'gray.700',
            name: 'ellipsis-vertical'
          }}
        />
      </HStack>
    </Pressable>
  ));

  return (
    <VStack h="full" justifyContent={exercices?.length ? '' : 'flex-end'}>
      <ScrollView w="full" h="full">
        <VStack h="full" space={4} p="4">
          {!!exercices?.length && exercicesList}
        </VStack>
      </ScrollView>
      <VStack p="4" pt={0} space={4}>
        {!exercices?.length && (
          <Box
            rounded={8}
            p={4}
            backgroundColor="gray.200"
            borderColor={'gray.400'}
            borderStyle="dashed"
            borderWidth={2}
          >
            <VStack space={1}>
              <Text color={'gray.500'} fontSize="xl">
                Pas d'exercices
              </Text>
              <Text color={'gray.500'}>Créez en ici ou pendant la création de votre programme</Text>
            </VStack>
          </Box>
        )}
        <Button
          w="full"
          leftIcon={<Icon as={Ionicons} name="add" size="md" />}
          onPress={() => navigation.navigate('ExerciceModal', {})}
        >
          Ajouter un exercice
        </Button>
      </VStack>
    </VStack>
  );
}
