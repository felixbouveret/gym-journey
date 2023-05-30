import { Box, VStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import Calendar from '@/components/Calendar';
import InfoBlock from '@/components/InfoBlock';
import { HistoryScreenProps } from '@/navigation/navigators/HistoryNavigator';
import { RootState } from '@/store';
import { setActiveTraining } from '@/store/Training';

export default function HistoryList({ navigation }: HistoryScreenProps<'HistoryList'>) {
  const dispatch = useDispatch();
  const { trainings } = useSelector((state: RootState) => state.trainings);

  return (
    <VStack h="full" justifyContent={trainings?.length ? '' : 'flex-end'}>
      {trainings?.length && (
        <Calendar
          items={trainings}
          onReservationPress={(id) => navigation.navigate('HistorySingle', { id })}
          onUnfinishedTrainingPress={(id) => {
            dispatch(setActiveTraining(id));
            navigation.navigate('Training', {
              screen: 'TrainingStepper',
              params: { trainingId: id }
            });
          }}
        />
      )}
      {trainings?.length === 0 && (
        <Box p="4" pt={0}>
          <InfoBlock
            title="Pas de séances enregistrées"
            description="Commencez une séance pour enregistrer votre progression"
          />
        </Box>
      )}
    </VStack>
  );
}
