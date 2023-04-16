import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ActionSheetIOS, ScrollView } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPrograms } from '@/api/BackPackAPI';
import BlockPlaceholder from '@/components/BlockPlaceholder';
import usePrograms from '@/hooks/usePrograms';
import { ProgramsTabScreenProps } from '@/navigation/navigators/ProgramsNavigator';
import { RootState } from '@/store';
import { setActiveTraining, TrainingStateEnum } from '@/store/Training';
import { UID_V4 } from '@/types/global.types';
import { Program, ProgramSession, ProgramStatus } from '@/types/Programs.types';

import ProgramBlock from './Components/ProgramBlock';

export default function ProgramsListStack({ navigation }: ProgramsTabScreenProps<'Programs'>) {
  const dispatch = useDispatch();
  const { trainings } = useSelector((state: RootState) => state.trainings);
  const { onCreateProgram, onDeleteProgram, onUpdateProgram, onArchiveProgram, onRestorProgram } =
    usePrograms();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      try {
        setRefreshing(true);
        const response = await getAllPrograms();
        setPrograms(response.programs);
        setRefreshing(false);
      } catch (error) {
        console.error(error);
      }
    };
    apiCall();
  }, []);

  const onProgramOptionsPress = (id: UID_V4, status: ProgramStatus) =>
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
            : navigation.navigate('ProgramsCreation', { id: id });
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
        sessionId: session.id
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
      setPrograms(response.programs);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };

  return (
    <VStack h="full" justifyContent={programs?.length ? '' : 'flex-end'}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <VStack alignItems="center" h="full" w="full" p={4} space="4">
          {ongoingTraining && (
            <Pressable
              w="full"
              p={4}
              backgroundColor="white"
              borderRadius="8"
              shadow={4}
              onPress={() => {
                dispatch(setActiveTraining(ongoingTraining.id));
                navigation.navigate('Training', {
                  screen: 'TrainingStepper',
                  params: { trainingId: ongoingTraining.id }
                });
              }}
            >
              <HStack alignItems={'center'} justifyContent="space-between">
                <VStack alignItems="flex-start">
                  <Text fontSize="lg" fontWeight="bold" color="gray.700">
                    Reprendre l'entrainement
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {ongoingTraining.sessionName}
                  </Text>
                </VStack>
                <Icon
                  size="sm"
                  as={Ionicons}
                  flexShrink={0}
                  color="gray.700"
                  name="chevron-forward"
                />
              </HStack>
            </Pressable>
          )}
          {programs.length
            ? programs.map((program, index) => (
                <ProgramBlock
                  program={program}
                  key={index}
                  onOptionsPress={() => onProgramOptionsPress(program.id, program.status)}
                  onEditPress={() => navigation.navigate('ProgramsCreation', { id: program.id })}
                  onSessionPress={(session) => onProgramPress(program.id, session)}
                />
              ))
            : null}
        </VStack>
      </ScrollView>
      {!programs.length && (
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
