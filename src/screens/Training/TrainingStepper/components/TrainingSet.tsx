import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Input, Text, VStack } from 'native-base';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ITrainingLift, ITrainingSet } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

interface TrainingSetProps {
  index: number;
  stepIndex: number;
  onLiftUpdate: (exerciceIndex: number, value: ITrainingLift) => void;
  onOptions: (setId: UID_V4) => void;
}

const Lift = ({
  eIndex,
  lift,
  weightPlaceholder,
  repsPlaceholder,
  onLiftUpdate
}: {
  eIndex: number;
  lift: ITrainingLift;
  weightPlaceholder: string;
  repsPlaceholder: string;
  onLiftUpdate: (exerciceIndex: number, value: ITrainingLift) => void;
}) => {
  return (
    <HStack space={2}>
      <Input
        flex="1"
        placeholder={repsPlaceholder}
        value={lift.reps}
        onChange={(e) => onLiftUpdate(eIndex, { reps: e.nativeEvent.text, weight: lift.weight })}
        backgroundColor={'white'}
        size={'lg'}
        selectTextOnFocus
        keyboardType="decimal-pad"
        InputRightElement={
          <Text p={2} fontSize={'2xs'} textAlign={'right'} color="gray.400">
            Reps
          </Text>
        }
      />
      <Input
        flex="1"
        placeholder={weightPlaceholder}
        value={lift.weight}
        onChange={(e) => onLiftUpdate(eIndex, { reps: lift.reps, weight: e.nativeEvent.text })}
        backgroundColor={'white'}
        size={'lg'}
        selectTextOnFocus
        keyboardType="decimal-pad"
        InputRightElement={
          <Text p={2} fontSize={'2xs'} textAlign={'right'} color="gray.400">
            Kg
          </Text>
        }
      />
    </HStack>
  );
};

function TrainingSet({ index, stepIndex, onLiftUpdate, onOptions }: TrainingSetProps) {
  const { exercices } = useSelector(
    (state: RootState) => state.exercices,
    () => true
  );
  const getExerciceName = (exerciceId: UID_V4) => exercices.find((e) => e.id === exerciceId)?.name;
  console.log('set', index);

  const set = useSelector(
    (state: RootState) => state.trainings.activeTraining?.steps[stepIndex].sets[index],
    () => true
  ) as ITrainingSet;

  const [setState, setSetState] = useState<ITrainingSet>(set);

  return (
    <HStack rounded="8" space={2}>
      <Box
        w={'24px'}
        backgroundColor={'gray.100'}
        alignItems="center"
        justifyContent="center"
        rounded={8}
      >
        <Text fontSize={'xs'} color={'gray.500'}>
          {index + 1}
        </Text>
      </Box>
      <HStack space={2} flex="1">
        <VStack flex={1} space="1">
          {setState.exercices.map(({ lift, exerciceId, weight, reps }, i) => (
            <VStack key={i}>
              {set.exercices.length > 1 && (
                <Text fontSize={'2xs'}>{getExerciceName(exerciceId)}</Text>
              )}
              {Lift({
                eIndex: i,
                lift,
                weightPlaceholder: weight,
                repsPlaceholder: reps,
                onLiftUpdate: onLiftUpdate
              })}
            </VStack>
          ))}
        </VStack>
      </HStack>
      <IconButton
        size="sm"
        p={1}
        onPress={() => onOptions(set.id)}
        _icon={{
          as: Ionicons,
          color: 'gray.700',
          name: 'ellipsis-vertical'
        }}
      />
    </HStack>
  );
}

export default memo(TrainingSet);
