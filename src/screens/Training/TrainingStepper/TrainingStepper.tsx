import { Button, HStack, KeyboardAvoidingView, VStack } from 'native-base';
import { useEffect, useMemo, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';

import useTraining from '@/hooks/useTraining';
import { TrainingScreenProps } from '@/navigation/navigators/TrainingNavigator';
import { RootState } from '@/store';
import { Training } from '@/store/Training';

import TrainingCard from './components/TrainingCard';

export default function TrainingStepper({ navigation }: TrainingScreenProps<'TrainingStepper'>) {
  const { onTrainingFinished } = useTraining();
  const activeTraining = useSelector(
    (state: RootState) => state.trainings.activeTraining,
    () => true
  ) as Training;
  const [stepsState, _] = useState(activeTraining.steps);

  const steps = useMemo(() => stepsState, [stepsState]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: activeTraining?.sessionName
    });
  }, []);

  if (!stepsState) return <></>;

  return (
    <VStack h="full" backgroundColor={'white'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
        flex={1}
      >
        <VStack flex={1}>
          <Swiper loop={false} onIndexChanged={Keyboard.dismiss}>
            {steps.map((step, index) => (
              <TrainingCard key={index} index={index} step={step} onExerciceSwitch={() => null} />
            ))}
          </Swiper>
        </VStack>
      </KeyboardAvoidingView>

      <HStack
        p="4"
        pb={8}
        pt={2}
        space={4}
        backgroundColor="white"
        borderTopColor={'gray.100'}
        borderTopWidth="1"
      >
        <Button
          flex="1"
          onPress={() =>
            onTrainingFinished(activeTraining.id, () => navigation.navigate('History'))
          }
        >
          Terminer
        </Button>
      </HStack>
    </VStack>
  );
}
