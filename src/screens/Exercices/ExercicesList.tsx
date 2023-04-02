import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, FlatList, HStack, Icon, Text, VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import BlockPlaceholder from '@/components/BlockPlaceholder';
import ExerciceContainer from '@/components/ExerciceContainer';
import { ExercicesTabScreenProps } from '@/navigation/navigators/ExercicesNavigator';
import { RootState } from '@/store';
import { removeExercice } from '@/store/Exercices';
import { Exercice, UID_V4 } from '@/types/Exercices.types';

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

  const exercicesList = ({ item }: { item: Exercice }) => (
    <Box py={1} px={4}>
      <ExerciceContainer
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
    </Box>
  );

  return (
    <VStack h="full" justifyContent={exercices?.length ? '' : 'flex-end'}>
      <FlatList pt="3" w="full" h="full" data={exercices} renderItem={exercicesList} />
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
