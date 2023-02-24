import { Box, Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ExercicesTabScreenProps } from '@/types';

export default function ExerciceSingle({
  navigation,
  route
}: ExercicesTabScreenProps<'ExerciceSingle'>) {
  const { exercices } = useSelector((state: RootState) => state.exercices);
  const currentExercice = exercices.find((exercice) => exercice.id === route.params.id);

  useEffect(() => {
    navigation.setOptions({
      title: currentExercice?.name,
      headerBackTitle: 'Retour'
    });
  }, []);

  return (
    <VStack w="full" h="full" p={4}>
      <Box
        rounded={8}
        p={4}
        backgroundColor="gray.200"
        borderColor={'gray.400'}
        borderStyle="dashed"
        borderWidth={2}
      >
        <VStack space={1}>
          {!!currentExercice &&
            Object.values(currentExercice)
              .filter((e) => e)
              .map((value, key) => (
                <Text key={key} color={'gray.500'} fontSize="xl">
                  {value}
                </Text>
              ))}
        </VStack>
      </Box>
    </VStack>
  );
}
