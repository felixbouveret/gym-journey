import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, Icon, Pressable, ScrollView, Text, VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import BlockPlaceholder from '@/components/BlockPlaceholder';
import usePrograms from '@/hooks/usePrograms';
import { RootState } from '@/store';
import { ProgramSession, ProgramStatus, UID_V4 } from '@/store/Programs';
import { TrainingStateEnum } from '@/store/Training';
import { ProgramsTabScreenProps } from '@/types';

import ProgramBlock from './Components/ProgramBlock';

export default function ProgramsListStack({ navigation }: ProgramsTabScreenProps<'Programs'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
  const { trainings } = useSelector((state: RootState) => state.trainings);
  const { onCreateProgram, onDeleteProgram, onUpdateProgram, onArchiveProgram, onRestorProgram } =
    usePrograms();

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

  return (
    <VStack h="full" justifyContent={programs?.length ? '' : 'flex-end'}>
      <ScrollView>
        <VStack
          justifyContent={programs.length ? '' : 'flex-end'}
          alignItems="center"
          h="full"
          w="full"
          p={4}
          space="4"
        >
          {ongoingTraining && (
            <Pressable
              w="full"
              p={4}
              backgroundColor="white"
              borderRadius="8"
              shadow={4}
              onPress={() =>
                navigation.navigate('Training', {
                  screen: 'TrainingStepper',
                  params: { trainingId: ongoingTraining.id }
                })
              }
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
