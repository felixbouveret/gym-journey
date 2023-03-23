import { format } from 'date-fns';
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import InfoBlock from '@/components/InfoBlock';
import { HistoryScreenProps } from '@/navigation/navigators/HistoryNavigator';
import { RootState } from '@/store';
import { Training } from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

export default function HistorySingle({ navigation, route }: HistoryScreenProps<'HistorySingle'>) {
  const { trainings } = useSelector((state: RootState) => state.trainings);
  const currentTraining = trainings.find((exercice) => exercice.id === route.params.id) as Training;
  const { exercices } = useSelector((state: RootState) => state.exercices);
  const getExerciceName = (exerciceId: UID_V4) => exercices.find((e) => e.id === exerciceId)?.name;

  useEffect(() => {
    navigation.setOptions({
      title: currentTraining.sessionName,
      headerBackTitle: 'Retour'
    });
  }, []);

  return (
    <ScrollView>
      <VStack w="full" h="full" p={4} space="4">
        <InfoBlock title={currentTraining.sessionName}>
          <Text fontSize={'xs'} fontWeight="medium">
            Commencé le {format(new Date(currentTraining.startedAt), 'dd/MM/yyyy HH:mm')}
          </Text>
          {currentTraining.finishedAt && (
            <Text fontSize={'xs'} fontWeight="medium">
              Terminé le {format(new Date(currentTraining.finishedAt), 'dd/MM/yyyy HH:mm')}
            </Text>
          )}
        </InfoBlock>
        <VStack space="2">
          {currentTraining.steps.map((step) => (
            <VStack py={2} backgroundColor="white" rounded={8} space={2}>
              <HStack space={4} px={4}>
                {step.exercices.map((exercice, index) => (
                  <Text key={index} fontSize={'md'} fontWeight="medium">
                    {getExerciceName(exercice)}
                  </Text>
                ))}
              </HStack>
              <VStack space={1}>
                {step.sets.map((set, index) => (
                  <HStack
                    space={4}
                    px={4}
                    alignItems="center"
                    justifyContent={'space-between'}
                    backgroundColor={index % 2 ? 'gray.50' : 'white'}
                  >
                    <Box>
                      <Text fontSize={'xs'} fontWeight="medium">
                        {index + 1}
                      </Text>
                    </Box>
                    {set.exercices.map(({ lift, exerciceId }, i) => (
                      <VStack key={i} justifyContent="space-between">
                        {set.exercices.length > 1 && (
                          <Text fontSize={'2xs'}>{getExerciceName(exerciceId)}</Text>
                        )}
                        <HStack space={2}>
                          <Text backgroundColor={'white'}>{lift.reps} reps</Text>
                          <Text backgroundColor={'white'}>{lift.weight} Kg</Text>
                        </HStack>
                      </VStack>
                    ))}
                  </HStack>
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
