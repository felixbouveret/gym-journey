import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, FlatList, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ActionSheetIOS } from 'react-native';

import { getExercices } from '@/api/BackPackAPI';
import BlockPlaceholder from '@/components/BlockPlaceholder';
import ExerciceContainer from '@/components/ExerciceContainer';
import { ExercicesTabScreenProps } from '@/navigation/navigators/ExercicesNavigator';
import { Exercice } from '@/types/Exercices.types';

export default function ExercicesList({ navigation }: ExercicesTabScreenProps<'ExercicesList'>) {
  const [exercices, setExercices] = useState<Exercice[]>([]);

  const onLoad = async () => {
    const exo = await getExercices();
    setExercices(exo);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onOptions = (id: string) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Modifier', 'Supprimer'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1) return navigation.navigate('ExerciceModal', { id });
        if (buttonIndex === 2) return;
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
