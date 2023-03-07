import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import SessionStep from '@/components/SessionStep';
import { SessionRecapScreenProps } from '@/screens/TrainingScreen';
import { RootState } from '@/store';
import { Training } from '@/store/Training';

export default function SessionRecap({ navigation }: SessionRecapScreenProps<'SessionRecap'>) {
  const { training } = useSelector((state: RootState) => state.training) as { training: Training };

  useEffect(() => {
    navigation.setOptions({
      title: training.sessionName
    });
  }, []);

  const averageTime = training.steps.reduce(
    (acc, step) =>
      acc + (Number(step.sessionStep.restTime) + 1) * Number(step.sessionStep.setNumber),
    0
  );

  return (
    <ScrollView>
      <VStack w="full" h="full" justifyContent="center" px={4}>
        <HStack space={4} pt={8}>
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
        <VStack space={4} pt={8} pb={4}>
          {training.steps.map((step, id) => (
            <SessionStep item={step.sessionStep} key={id} />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
