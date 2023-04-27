import { Box, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ActionSheetIOS, ScrollView } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPrograms } from '@/api/BackPackAPI';
import BlockPlaceholder from '@/components/BlockPlaceholder';
import usePrograms from '@/hooks/usePrograms';
import { ProgramsTabScreenProps } from '@/navigation/navigators/ProgramsNavigator';
import { RootState } from '@/store';
import { setPrograms } from '@/store/Programs';
import { setActiveTraining, TrainingStateEnum } from '@/store/Training';
import { UID_V4 } from '@/types/global.types';
import { ProgramSession, ProgramSimplified, ProgramStatus } from '@/types/Programs.types';

import CurrentTrainingCard from './Components/CurrentTrainingCard';
import ProgramBlock from './Components/ProgramBlock';

export default function ProgramsListStack({ navigation }: ProgramsTabScreenProps<'Programs'>) {
  const dispatch = useDispatch();
  const { trainings } = useSelector((state: RootState) => state.trainings);
  const { programsList } = useSelector((state: RootState) => state.programs);
  const { onCreateProgram, onDeleteProgram, onUpdateProgram, onArchiveProgram, onRestorProgram } =
    usePrograms();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      try {
        setRefreshing(true);
        const response = await getAllPrograms();
        dispatch(setPrograms(response.programs));
        setRefreshing(false);
      } catch (error) {
        console.error(error);
      }
    };
    apiCall();
  }, []);

  const onProgramOptionsPress = ({ id, name, status }: ProgramSimplified) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Annuler',
          status === ProgramStatus.ARCHIVED ? 'Restaurer' : 'Modifier',
          status === ProgramStatus.ACTIVE ? 'Archiver' : 'Renommer',
          'Supprimer'
        ],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1)
          return status === ProgramStatus.ARCHIVED
            ? onRestorProgram(id)
            : navigation.navigate('ProgramsCreation', { id, name });
        if (buttonIndex === 2)
          return status === ProgramStatus.ACTIVE ? onArchiveProgram(id) : onUpdateProgram(id);
        if (buttonIndex === 3) return onDeleteProgram(id);
      }
    );

  const onProgramPress = (programId: UID_V4, session: ProgramSession) => {
    navigation.navigate('Training', {
      screen: 'SessionRecap',
      params: {
        programId,
        sessionId: session.program_session_id
      }
    });
  };

  const ongoingTraining = trainings.find(
    (training) => training.state === TrainingStateEnum.IN_PROGRESS
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await getAllPrograms();
      dispatch(setPrograms(response.programs));
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };

  return (
    <VStack h="full" justifyContent={programsList?.length ? '' : 'flex-end'}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <VStack alignItems="center" h="full" w="full" p={4} space="4">
          {ongoingTraining && (
            <CurrentTrainingCard
              ongoingTraining={ongoingTraining}
              onPress={() => {
                dispatch(setActiveTraining(ongoingTraining.id));
                navigation.navigate('Training', {
                  screen: 'TrainingStepper',
                  params: { trainingId: ongoingTraining.id }
                });
              }}
            />
          )}
          {programsList.length
            ? programsList.map((program, index) => (
                <ProgramBlock
                  program={program}
                  key={index}
                  onOptionsPress={() => onProgramOptionsPress(program)}
                  onEditPress={() =>
                    navigation.navigate('ProgramsCreation', { id: program.id, name: program.name })
                  }
                  onSessionPress={(session) => onProgramPress(program.id, session)}
                />
              ))
            : null}
        </VStack>
      </ScrollView>
      {!programsList.length && (
        <Box p={4}>
          <BlockPlaceholder
            onPress={() => {
              onCreateProgram((id) => navigation.navigate('ProgramsCreation', { id }));
            }}
            title="Aucun programme pour le moment"
            description="Vos programmes apparaîtront ici. Créez-en un pour commencer."
            cta="Créer votre premier programme"
          />
        </Box>
      )}
    </VStack>
  );
}
