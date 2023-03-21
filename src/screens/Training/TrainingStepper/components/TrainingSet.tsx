import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Input, Text, VStack } from 'native-base';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ITrainingLift, ITrainingSet } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

interface TrainingSetProps {
  set: ITrainingSet;
  index: number;
  onLiftUpdate: (exerciceIndex: number, value: ITrainingLift) => void;
  onOptions: (setId: UID_V4) => void;
}

function TrainingSet({ set, index, onLiftUpdate, onOptions }: TrainingSetProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);
  const getExerciceName = (exerciceId: UID_V4) => exercices.find((e) => e.id === exerciceId)?.name;

  const Lift = ({
    eIndex,
    lift,
    weightPlaceholder,
    repsPlaceholder
  }: {
    eIndex: number;
    lift: ITrainingLift;
    weightPlaceholder: string;
    repsPlaceholder: string;
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
          {set.exercices.map(({ lift, exerciceId, weight, reps }, i) => (
            <VStack key={i}>
              {set.exercices.length > 1 && (
                <Text fontSize={'2xs'}>{getExerciceName(exerciceId)}</Text>
              )}
              {Lift({
                eIndex: i,
                lift,
                weightPlaceholder: weight,
                repsPlaceholder: reps
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
