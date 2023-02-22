import { Badge, Box, Button, HStack, ScrollView, Text, View, VStack } from 'native-base';
import { useEffect, useState } from 'react';

import useStorage from '@/hooks/useStorage';
import { RootTabScreenProps } from '@/types';
import { Exercice } from '@/types/Exercices.types';

export default function ExercicesScreen({ navigation }: RootTabScreenProps<'Exercices'>) {
  const [exercices, setExercices] = useState<Exercice[]>([]);

  const { getStorageData } = useStorage();

  const fetchExercices = async () => {
    const exercicesFromStorage = await getStorageData('exercices');

    setExercices(exercicesFromStorage);
  };

  useEffect(() => {
    fetchExercices();
  }, []);

  const Wrapper = exercices?.length ? ScrollView : View;

  const exercicesList = exercices?.map((exercice, index) => (
    <Box rounded={8} p={4} backgroundColor="white" key={index}>
      <VStack space={1}>
        <HStack justifyContent={'space-between'}>
          <Text color={'gray.700'} fontSize="xl">
            {exercice.name}
          </Text>
          {exercice?.isUnilateral ? <Badge>Unilateral</Badge> : null}
        </HStack>

        <Text color={'gray.700'}>{exercice?.description}</Text>
      </VStack>
    </Box>
  ));

  return (
    <Wrapper w="full" h="full">
      <VStack h="full" padding={4} justifyContent={exercices?.length ? '' : 'center'} space={4}>
        {exercices?.length ? (
          exercicesList
        ) : (
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
        <Button onPress={() => navigation.navigate('ExerciceModal')}>Ajouter un exercice</Button>
      </VStack>
    </Wrapper>
  );
}
