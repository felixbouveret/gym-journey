import { Box, Button, HStack, VStack } from 'native-base';
import { useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import Layout from '@/constants/Layout';
import useTraining from '@/hooks/useTraining';
import { TrainingScreenProps } from '@/navigation/navigators/TrainingNavigator';
import { RootState } from '@/store';
import { ITrainingStep } from '@/store/Training';

import TrainingCard from './components/TrainingCard';

const renderItem = ({ item }: { item: ITrainingStep }) => (
  <TrainingCard step={item} onExerciceSwitch={() => null} />
);

export default function TrainingStepper({}: TrainingScreenProps<'TrainingStepper'>) {
  const { activeTraining } = useSelector((state: RootState) => state.trainings);
  const { onTrainingFinished } = useTraining();
  const [currentStep, setCurrentStep] = useState(0);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    if (viewableItems?.[0] && viewableItems?.[0]?.index !== null)
      setCurrentStep(viewableItems[0].index);
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { viewAreaCoveragePercentThreshold: 50 },
      onViewableItemsChanged
    }
  ]);

  if (!activeTraining) return <></>;

  return (
    <VStack h="full">
      <FlatList
        data={activeTraining.steps}
        keyExtractor={(item) => item.id as string}
        renderItem={renderItem}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        horizontal
        snapToAlignment="center"
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={activeTraining.steps.map((_, index) => index * Layout.window.width)}
      />
      <HStack justifyContent={'center'} space="1" pb={4}>
        {activeTraining.steps.map((_, index) => (
          <Box
            key={index}
            w={2}
            h={2}
            rounded="full"
            backgroundColor={currentStep === index ? 'gray.500' : 'gray.200'}
          />
        ))}
      </HStack>
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
