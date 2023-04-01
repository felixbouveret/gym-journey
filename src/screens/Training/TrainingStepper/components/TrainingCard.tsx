import { ScrollView, TextArea, VStack } from 'native-base';
import { memo, useMemo } from 'react';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import useTraining from '@/hooks/useTraining';
import { RootState } from '@/store';
import { ITrainingStep } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

import TrainingExerciceHeading from './TrainingExerciceHeading';
import TrainingNewSetCta from './TrainingNewSetCta';
import TrainingSet from './TrainingSet';

interface TrainingCardProps {
  step: ITrainingStep;
  index: number;
  onExerciceSwitch: (stepId: UID_V4) => void;
}

function TrainingCard({ index, onExerciceSwitch }: TrainingCardProps) {
  const { onTrainingLiftUpdate, addSet, removeSet } = useTraining();

  const step = useSelector(
    (state: RootState) => state.trainings.activeTraining?.steps[index],
    (prev, next) => prev?.sets.length === next?.sets.length
  ) as ITrainingStep;

  const sets = useMemo(() => step.sets, [step.sets]);

  const onOptions = (setId: UID_V4) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Supprimer'],
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 1) return removeSet(step, setId);
        if (buttonIndex === 0) return;
      }
    );

  return (
    <VStack py={0} h="full">
      <TrainingExerciceHeading step={step} onExerciceSwitch={onExerciceSwitch} />
      <ScrollView p={4}>
        <TextArea
          size={'xl'}
          autoCompleteType="off"
          h={'100px'}
          placeholder="Note d'exercice"
          backgroundColor={'amber.100'}
          color={'amber.800'}
          placeholderTextColor={'amber.300'}
          borderWidth={0}
          p={4}
          mt={4}
        />

        <VStack space={2} mt={8}>
          {sets.map((set, i) => (
            <TrainingSet
              key={i}
              stepIndex={index}
              index={i}
              onLiftUpdate={(exerciceIndex, value) => {
                onTrainingLiftUpdate(step.id, set.id, exerciceIndex, value);
              }}
              onOptions={onOptions}
            />
          ))}
        </VStack>
        <TrainingNewSetCta onPress={() => addSet(step)} />
      </ScrollView>
    </VStack>
  );
}

export default memo(TrainingCard);
