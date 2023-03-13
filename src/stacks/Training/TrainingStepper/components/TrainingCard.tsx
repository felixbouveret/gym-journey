import { Button, KeyboardAvoidingView, Pressable, ScrollView, VStack } from 'native-base';
import { Keyboard, Platform } from 'react-native';

import Layout from '@/constants/Layout';
import { ITrainingStep } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

import TrainingExerciceHeading from './TrainingExerciceHeading';
import TrainingSet from './TrainingSet';

interface TrainingCardProps {
  step: ITrainingStep;
  onExerciceSwitch: (stepId: UID_V4) => void;
}

export default function TrainingCard({ step, onExerciceSwitch }: TrainingCardProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <VStack w={Layout.window.width - 32} m={4} backgroundColor="white" rounded={8} shadow={2}>
        <Pressable onPress={Keyboard.dismiss}>
          <ScrollView>
            <VStack p={4} space={4}>
              <TrainingExerciceHeading step={step} onExerciceSwitch={onExerciceSwitch} />

              <VStack space={2}>
                {step.sets.map((set, index) => (
                  <TrainingSet key={index} set={set} index={index} />
                ))}
                <Button mt={4} variant="outline">
                  Ajouter un set
                </Button>
              </VStack>
            </VStack>
          </ScrollView>
        </Pressable>
      </VStack>
    </KeyboardAvoidingView>
  );
}
