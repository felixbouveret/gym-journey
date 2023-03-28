import { Button, KeyboardAvoidingView, ScrollView, VStack } from 'native-base';
import { memo } from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import { useSelector } from 'react-redux';

import Layout from '@/constants/Layout';
import useTraining from '@/hooks/useTraining';
import { RootState } from '@/store';
import { ITrainingStep } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

import TrainingExerciceHeading from './TrainingExerciceHeading';
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <VStack
        w={Layout.window.width - 32}
        maxH={Layout.window.height - 250}
        m={4}
        backgroundColor="white"
        rounded={8}
        shadow={2}
      >
        <ScrollView>
          <VStack p={4} space={4} h="full">
            <TrainingExerciceHeading step={step} onExerciceSwitch={onExerciceSwitch} />

            <VStack space={2}>
              {step.sets.map((set, i) => (
                <TrainingSet
                  key={i}
                  set={set}
                  stepIndex={index}
                  index={i}
                  onLiftUpdate={(exerciceIndex, value) => {
                    onTrainingLiftUpdate(step.id, set.id, exerciceIndex, value);
                  }}
                  onOptions={onOptions}
                />
              ))}
            </VStack>
            <Button variant="outline" onPress={() => addSet(step)}>
              Ajouter un set
            </Button>
          </VStack>
        </ScrollView>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default memo(TrainingCard);
