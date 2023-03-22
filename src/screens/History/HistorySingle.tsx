import { format } from 'date-fns';
import { Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import InfoBlock from '@/components/InfoBlock';
import { HistoryScreenProps } from '@/navigation/navigators/HistoryNavigator';
import { RootState } from '@/store';
import { Training } from '@/store/Training';

export default function HistorySingle({ navigation, route }: HistoryScreenProps<'HistorySingle'>) {
  const { trainings } = useSelector((state: RootState) => state.trainings);
  const currentTraining = trainings.find((exercice) => exercice.id === route.params.id) as Training;

  useEffect(() => {
    navigation.setOptions({
      title: currentTraining.sessionName,
      headerBackTitle: 'Retour'
    });
  }, []);

  return (
    <VStack w="full" h="full" p={4}>
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
      <Text>{currentTraining.id}</Text>
    </VStack>
  );
}
