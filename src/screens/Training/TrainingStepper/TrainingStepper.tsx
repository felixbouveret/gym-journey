import { Button, HStack, VStack } from 'native-base';
import { useEffect, useMemo } from 'react';
import Swiper from 'react-native-swiper';
import { useSelector } from 'react-redux';

import useTraining from '@/hooks/useTraining';
import { TrainingScreenProps } from '@/navigation/navigators/TrainingNavigator';
import { RootState } from '@/store';
import { Training } from '@/store/Training';

import TrainingCard from './components/TrainingCard';

export default function TrainingStepper({ navigation }: TrainingScreenProps<'TrainingStepper'>) {
  const { activeTraining } = useSelector(
    (state: RootState) => state.trainings,
    () => true
  ) as {
    activeTraining: Training;
  };

  const { onTrainingFinished } = useTraining();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: activeTraining?.sessionName
    });
  }, []);

  const steps = useMemo(() => activeTraining?.steps, [activeTraining?.steps]);

  if (!activeTraining) return <></>;

  return (
    <VStack h="full">
      <Swiper loop={false} loadMinimal>
        {steps.map((step, index) => (
          <TrainingCard key={index} index={index} step={step} onExerciceSwitch={() => null} />
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
