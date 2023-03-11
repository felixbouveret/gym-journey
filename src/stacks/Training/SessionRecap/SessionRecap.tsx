import { Ionicons } from '@expo/vector-icons';
import { Button, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import SessionStep from '@/components/SessionStep';
import useTraining from '@/hooks/useTraining';
import { SessionRecapScreenProps } from '@/screens/TrainingScreen';
import { RootState } from '@/store';
import { Training } from '@/store/Training';

export default function SessionRecap({ navigation }: SessionRecapScreenProps<'SessionRecap'>) {
  const { training } = useSelector((state: RootState) => state.training) as { training: Training };

  const { onTrainingStart } = useTraining();

  useEffect(() => {
    navigation.setOptions({
      title: training.sessionName
    });
  }, []);

  const averageTime = training.steps.reduce(
    (acc, step) =>
      acc + (parseFloat(step.sessionStep.restTime) + 1) * parseFloat(step.sessionStep.setNumber),
    0
  );

  return (
    <VStack h="full">
      <ScrollView>
        <VStack h="full" justifyContent="center" px={4}>
          <VStack space={2} pb={4} pt={8}>
            <Text fontSize={'md'} fontWeight="medium">
              Informations
            </Text>
            <HStack space={2}>
              <VStack
                rounded={8}
                p={4}
                flex={1}
                backgroundColor="gray.200"
                borderColor={'gray.400'}
                borderWidth={2}
                alignItems="center"
              >
                <Icon as={Ionicons} name="stopwatch-outline" size={8} />
                <Text color={'gray.500'} fontSize="xl" textAlign={'center'}>
                  ~{averageTime} minutes
                </Text>
              </VStack>
              <VStack
                rounded={8}
                p={4}
                flex={1}
                backgroundColor="gray.200"
                borderColor={'gray.400'}
                borderWidth={2}
                alignItems="center"
              >
                <Icon as={Ionicons} name="albums-outline" size={8} />
                <Text color={'gray.500'} fontSize="xl" textAlign={'center'}>
                  {training.steps.length} exercices
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack space={2} pt={4} pb={4}>
            <Text fontSize={'md'} fontWeight="medium">
              Exercices de la séance
            </Text>
            {training.steps.map((step, id) => (
              <SessionStep item={step.sessionStep} key={id} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
      <HStack
        p="4"
        pb={8}
        pt={2}
        backgroundColor="white"
        borderTopColor={'gray.100'}
        borderTopStyle="solid"
        borderTopWidth="1"
      >
        <Button
          w="full"
          onPress={() => {
            navigation.navigate('TrainingStepper', { training });
            onTrainingStart();
          }}
        >
          Démarrer la séance
        </Button>
      </HStack>
    </VStack>
  );
}
