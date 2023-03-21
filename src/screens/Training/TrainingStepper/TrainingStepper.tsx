import { Button, HStack, VStack } from 'native-base';
import { useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';

import useTraining from '@/hooks/useTraining';
import { TrainingScreenProps } from '@/navigation/navigators/TrainingNavigator';
import { RootState } from '@/store';
import { setActiveTraining, Training } from '@/store/Training';

import TrainingCard from './components/TrainingCard';

export default function TrainingStepper({
  route,
  navigation
}: TrainingScreenProps<'TrainingStepper'>) {
  const dispatch = useDispatch();
  const { activeTraining } = useSelector((state: RootState) => state.trainings) as {
    activeTraining: Training;
  };
  const { onTrainingFinished } = useTraining();

  const { trainingId } = route.params;

  useEffect(() => {
    if (!trainingId) return;
    dispatch(setActiveTraining(trainingId));

    navigation.setOptions({
      headerTitle: activeTraining?.sessionName
    });
  }, []);

  if (!activeTraining) return <></>;

  return (
    <VStack h="full">
      <Swiper loop={false} loadMinimal>
        {activeTraining.steps.map((step, index) => (
          <TrainingCard key={index} step={step} onExerciceSwitch={() => null} />
        ))}
      </Swiper>

      <HStack
        p="4"
        pb={8}
        pt={2}
        space={4}
        backgroundColor="white"
        borderTopColor={'gray.100'}
        borderTopStyle="solid"
        borderTopWidth="1"
      >
        <Button flex="1" onPress={() => onTrainingFinished(activeTraining.id)}>
          Terminer
        </Button>
      </HStack>
    </VStack>
  );
}
