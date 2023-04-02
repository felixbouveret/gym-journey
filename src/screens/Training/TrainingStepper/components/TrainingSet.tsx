import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash';
import { Box, HStack, IconButton, Input, Text, VStack } from 'native-base';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ITrainingSet, saveTraining, updateTrainingSet } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

const LiftInput = ({
  placeholder,
  value,
  name,
  onChange,
  onEndEditing
}: {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
  onEndEditing?: (e: any) => void;
}) => {
  return (
    <Input
      flex="1"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onEndEditing={onEndEditing}
      backgroundColor={'white'}
      size={'lg'}
      selectTextOnFocus
      keyboardType="decimal-pad"
      InputRightElement={
        <Text p={2} fontSize={'2xs'} textAlign={'right'} color="gray.400">
          {name}
        </Text>
      }
    />
  );
};

interface TrainingSetProps {
  stepId: UID_V4;
  setIndex: number;
  set: ITrainingSet;
  onOptions: (setId: UID_V4) => void;
}

function TrainingSet({ stepId, set, setIndex, onOptions }: TrainingSetProps) {
  const { exercices } = useSelector(
    (state: RootState) => state.exercices,
    () => true
  );
  const getExerciceName = (exerciceId: UID_V4) => exercices.find((e) => e.id === exerciceId)?.name;

  const [setState, setSetState] = useState<ITrainingSet>(set);

  const onLiftChange = (exerciceIndex: number, lift: { reps: string; weight: string }) => {
    setSetState((prevState) => ({
      ...prevState,
      exercices: prevState.exercices.map((e, i) => (i === exerciceIndex ? { ...e, lift } : e))
    }));
  };

  const dispatch = useDispatch();
  const updateSet = (exerciceIndex: number, lift: { reps: string; weight: string }) => {
    if (Object.entries(set.exercices[exerciceIndex].lift).every(([k, v]) => lift[k] === v)) return;
    dispatch(updateTrainingSet(stepId, set.id, setState));

    dispatch(saveTraining());
  };

  const debounceUpdate = debounce(updateSet, 500);

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
          {setIndex + 1}
        </Text>
      </Box>
      <HStack space={2} flex="1">
        <VStack flex={1} space="1">
          {setState.exercices.map(({ lift, exerciceId, weight, reps }, i) => (
            <VStack key={i}>
              {set.exercices.length > 1 && (
                <Text fontSize={'2xs'}>{getExerciceName(exerciceId)}</Text>
              )}
              <HStack space={2}>
                <LiftInput
                  placeholder={reps}
                  value={lift.reps}
                  name="Reps"
                  onChange={(e) =>
                    onLiftChange(i, { reps: e.nativeEvent.text, weight: lift.weight })
                  }
                  onEndEditing={(e) =>
                    debounceUpdate(i, { weight: lift.weight, reps: e.nativeEvent.text })
                  }
                />
                <LiftInput
                  placeholder={weight}
                  value={lift.weight}
                  name="Kg"
                  onChange={(e) => onLiftChange(i, { reps: lift.reps, weight: e.nativeEvent.text })}
                  onEndEditing={(e) =>
                    debounceUpdate(i, { weight: e.nativeEvent.text, reps: lift.reps })
                  }
                />
              </HStack>
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
