import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Input, Text, VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ITrainingLifts, ITrainingSet } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

interface TrainingSetProps {
  set: ITrainingSet;
  index: number;
}

export default function TrainingSet({ set, index }: TrainingSetProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);
  const getExerciceName = (exerciceId: UID_V4) => exercices.find((e) => e.id === exerciceId)?.name;
  const onOptions = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Supprimer'],
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 2) return;
      }
    );

  const Lifts = ({
    exerciceIndex,
    lifts,
    weightPlaceholder,
    repsPlaceholder
  }: {
    exerciceIndex: number;
    lifts: [ITrainingLifts, ITrainingLifts | undefined];
    weightPlaceholder: string;
    repsPlaceholder: string;
  }) => {
    const filteredLifts = lifts.filter((e) => e);

    return filteredLifts.map((l, i) => (
      <HStack key={i} justifyContent="space-between" space={4}>
        <Input
          flex="1"
          placeholder={repsPlaceholder}
          value={l?.reps}
          onChange={(e) => null}
          backgroundColor={'white'}
        />
        <Input
          flex="1"
          placeholder={weightPlaceholder}
          value={l?.weight}
          onChange={(e) => null}
          backgroundColor={'white'}
        />
      </HStack>
    ));
  };

  return (
    <HStack backgroundColor={'gray.100'} rounded="8" borderColor={'gray.100'} borderWidth={2}>
      <Box
        w={'24px'}
        backgroundColor={'white'}
        alignItems="center"
        justifyContent="center"
        roundedLeft={6}
      >
        <Text fontSize={'xs'}>#{index + 1}</Text>
      </Box>
      <HStack space={2} flex="1" ml={2}>
        <VStack p="2" flex={1} space="1">
          {set.exercices.map(({ lifts, exerciceId, weight, reps }, i) => (
            <VStack key={i}>
              {set.exercices.length > 1 && (
                <Text fontSize={'2xs'}>{getExerciceName(exerciceId)}</Text>
              )}
              {Lifts({ exerciceIndex: i, lifts, weightPlaceholder: weight, repsPlaceholder: reps })}
            </VStack>
          ))}
        </VStack>
      </HStack>
      <IconButton
        size="sm"
        p={1}
        onPress={() => onOptions()}
        _icon={{
          as: Ionicons,
          color: 'gray.700',
          name: 'ellipsis-vertical'
        }}
      />
    </HStack>
  );
}
