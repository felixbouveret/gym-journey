import { Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import InfoBlock from '@/components/InfoBlock';
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
      <InfoBlock title={currentExercice.name} description={currentExercice?.description} />
      <Text>{currentExercice.id}</Text>
    </VStack>
  );
}
