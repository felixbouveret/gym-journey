import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, IconButton, Text, VStack } from 'native-base';
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
    if (step.sessionStep.type === ExerciceType.SUPERSET)
      return (
        <VStack alignItems={'center'}>
          <Text fontSize={'md'} fontWeight="medium">
            {step.sessionStep.type}
          </Text>
          <HStack space={4}>
            {step.sessionStep.exercices.map((exercice, i) => (
              <Text key={i} fontSize={'xs'}>
                {getExerciceName(exercice.exerciceId)}
              </Text>
            ))}
          </HStack>
        </VStack>
      );
    return (
      <Text fontSize={'md'} fontWeight="medium">
        {getExerciceName(step.sessionStep.exercices[0].exerciceId)}
      </Text>
    );
  };

  return (
    <HStack w={'full'} justifyContent="space-between" alignItems={'center'} space={2}>
      <IconButton
        size="sm"
        variant={'solid'}
        _icon={{
          as: Ionicons,
          name: 'albums-outline'
        }}
      />
      <VStack alignItems={'center'}>
        {title()}
        <HStack justifyContent={'center'} space="2" alignItems={'center'}>
          <Icon as={Ionicons} name="hourglass-outline" size={4} />
          <Text fontSize={'xs'}>{step.sessionStep.restTime} min</Text>
        </HStack>
      </VStack>
      <IconButton
        size="sm"
        variant={'solid'}
        _icon={{
          as: Ionicons,
          name: 'swap-horizontal-outline'
        }}
      />
    </HStack>
  );
}
