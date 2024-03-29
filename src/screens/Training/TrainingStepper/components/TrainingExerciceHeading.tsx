import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Text, VStack } from 'native-base';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ITrainingStep } from '@/store/Training';
import { ExerciceType, UID_V4 } from '@/types/Exercices.types';

interface TrainingExerciceHeadingProps {
  step: ITrainingStep;
}

export default function TrainingExerciceHeading({ step }: TrainingExerciceHeadingProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);

  const getExerciceName = (exerciceId: UID_V4) => exercices.find((e) => e.id === exerciceId)?.name;

  const title = () => {
    if (step.type === ExerciceType.SUPERSET)
      return (
        <VStack alignItems={'center'}>
          <Text fontSize={'2xl'} fontWeight="medium">
            {step.type}
          </Text>
          <HStack space={4}>
            {step.exercices.map((exercice, i) => (
              <Text key={i} fontSize={'xs'}>
                {getExerciceName(exercice)}
              </Text>
            ))}
          </HStack>
        </VStack>
      );
    return (
      <Text fontSize={'2xl'} fontWeight="medium">
        {getExerciceName(step.exercices[0])}
      </Text>
    );
  };

  return (
    <HStack
      w={'full'}
      justifyContent="center"
      alignItems={'center'}
      space={2}
      borderBottomColor={'gray.100'}
      borderBottomWidth="1"
      py={4}
    >
      <VStack alignItems={'center'}>
        {title()}
        <HStack justifyContent={'center'} space="2" alignItems={'center'}>
          <Icon as={Ionicons} name="hourglass-outline" size={4} />
          <Text fontSize={'xs'}>{step.restTime} min</Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
