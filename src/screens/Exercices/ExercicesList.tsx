import { Ionicons } from '@expo/vector-icons';
import { Badge, Button, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BlockPlaceholder from '@/components/BlockPlaceholder';
import ExerciceContainer from '@/components/ExerciceContainer';
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
    <ExerciceContainer
      key={index}
      onPress={() => navigation.navigate('ExerciceSingle', { id: item.id })}
      onOptions={() => onOptions(item.id)}
      small
    >
      <HStack alignItems="center" justifyContent={'space-between'}>
        <Text fontSize={'md'} fontWeight="medium">
          {item.name}
        </Text>
        {item.isUnilateral && (
          <Badge>
            <Text>Unilatéral</Text>
          </Badge>
        )}
      </HStack>
    </ExerciceContainer>
  ));

  return (
    <VStack h="full" justifyContent={exercices?.length ? '' : 'flex-end'}>
      <ScrollView w="full" h="full">
        <VStack h="full" space={2} p="4">
          {!!exercices?.length && exercicesList}
        </VStack>
      </ScrollView>
      <VStack p="4" pt={0} space={4}>
        {!exercices?.length ? (
          <BlockPlaceholder
            onPress={() => navigation.navigate('ExerciceModal', {})}
            title="Pas d'exercices"
            description="Créez en ici ou pendant la création de votre programme"
            cta="Ajouter un exercice"
          />
        ) : (
          <Button
            w="full"
            leftIcon={<Icon as={Ionicons} name="add" size="md" />}
            onPress={() => navigation.navigate('ExerciceModal', {})}
          >
            Ajouter un exercice
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
