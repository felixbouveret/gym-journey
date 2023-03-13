import { Ionicons } from '@expo/vector-icons';
import { Button, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import SessionStep from '@/components/SessionStep';
import useTraining from '@/hooks/useTraining';
import { TrainingScreenProps } from '@/screens/TrainingScreen';
import { RootState } from '@/store';
import { Program, ProgramSession } from '@/store/Programs';
import { Training } from '@/store/Training';

export default function SessionRecap({ navigation, route }: TrainingScreenProps<'SessionRecap'>) {
  const { sessionId, programId } = route.params;

  const { programs } = useSelector((state: RootState) => state.programs);

  const currentProgram = programs.find((program) => program.id === programId) as Program;
  const currentSession = currentProgram.sessions.find(
    (session) => session.id === sessionId
  ) as ProgramSession;

  const { onTrainingStart, initTraining } = useTraining();

  const [training, _] = useState<Training>(initTraining(programId, currentSession));

  useEffect(() => {
    navigation.setOptions({
      title: training.sessionName
    });
  }, []);

  const averageTime = training.steps.reduce(
    (acc, step) => acc + (parseFloat(step.restTime) + 1) * step.sets.length,
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
              <SessionStep
                item={{
                  type: step.type,
                  setNumber: step.sets.length.toString(),
                  restTime: step.restTime,
                  exercices: step.sets[0].exercices.map((e) => ({
                    exerciceId: e.exerciceId,
                    reps: e.reps,
                    weight: e.weight
                  }))
                }}
                key={id}
              />
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
            onTrainingStart(training);
            navigation.navigate('TrainingStepper', { trainingId: training.id });
          }}
        >
          Démarrer la séance
        </Button>
      </HStack>
    </VStack>
  );
}
