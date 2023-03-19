import { Button, KeyboardAvoidingView, ScrollView, VStack } from 'native-base';
import { memo } from 'react';
import { Platform } from 'react-native';

import Layout from '@/constants/Layout';
import useTraining from '@/hooks/useTraining';
import { ITrainingStep } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

import TrainingExerciceHeading from './TrainingExerciceHeading';
import TrainingSet from './TrainingSet';

interface TrainingCardProps {
  step: ITrainingStep;
  onExerciceSwitch: (stepId: UID_V4) => void;
}

function TrainingCard({ step, onExerciceSwitch }: TrainingCardProps) {
  const { onTrainingLiftUpdate } = useTraining();

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
              {step.sets.map((set, index) => (
                <TrainingSet
                  key={index}
                  set={set}
                  index={index}
                  onLiftUpdate={(exerciceIndex, liftIndex, value) => {
                    onTrainingLiftUpdate(step.id, set.id, exerciceIndex, liftIndex, value);
                  }}
                />
              ))}
            </VStack>
            <Button variant="outline">Ajouter un set</Button>
          </VStack>
        </ScrollView>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default memo(TrainingCard);
