import { ScrollView, TextArea, VStack } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { ActionSheetIOS } from 'react-native';

import useTraining from '@/hooks/useTraining';
import { ITrainingStep } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

import TrainingExerciceHeading from './TrainingExerciceHeading';
import TrainingNewSetCta from './TrainingNewSetCta';
import TrainingSet from './TrainingSet';

const onOptions = (onRemove: () => void) =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Annuler', 'Supprimer'],
      cancelButtonIndex: 0
    },
    (buttonIndex) => {
      if (buttonIndex === 1) return onRemove();
      if (buttonIndex === 0) return;
    }
  );

interface TrainingCardProps {
  step: ITrainingStep;
  index: number;
}

export default function TrainingCard({ step, index }: TrainingCardProps) {
  const { addSet, onTrainingStepUpdate } = useTraining();

  const [stepState, setStepState] = useState(step);

  const sets = useMemo(() => stepState.sets, [stepState.sets]);

  const onAddSet = () => {
    const newSet = addSet(stepState);
    setStepState((prevState) => ({ ...prevState, sets: [...prevState.sets, newSet] }));
  };

  const onRemoveSet = (setId: UID_V4) => {
    const newSets = sets.filter((set) => set.id !== setId);
    setStepState((prevState) => ({ ...prevState, sets: newSets }));
  };

  useEffect(() => {
    onTrainingStepUpdate(step.id, stepState);
  }, [sets]);

  return (
    <VStack py={0} h="full">
      <TrainingExerciceHeading step={step} />
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
              set={set}
              stepId={step.id}
              setIndex={i}
              stepIndex={index}
              onOptions={() => onOptions(() => onRemoveSet(set.id))}
            />
          ))}
        </VStack>
        <TrainingNewSetCta onPress={onAddSet} />
      </ScrollView>
    </VStack>
  );
}
