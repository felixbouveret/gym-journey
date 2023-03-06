import { Box, ScrollView, VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import usePrograms from '@/hooks/usePrograms';
import { RootState } from '@/store';
import { ProgramStatus, UID_V4 } from '@/store/Programs';
import { ProgramsTabScreenProps } from '@/types';

import ProgramBlock from './Components/ProgramBlock';
import ProgramBlockPlaceholder from './Components/ProgramBlockPlaceholder';

export default function ProgramsListStack({ navigation }: ProgramsTabScreenProps<'Programs'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
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
          {programs.length
            ? programs.map((program, index) => (
                <ProgramBlock
                  program={program}
                  key={index}
                  onOptionsPress={() => onProgramOptionsPress(program.id, program.status)}
                  onEditPress={() => navigation.navigate('ProgramsCreation', { id: program.id })}
                  onSessionPress={(sessionId) =>
                    navigation.navigate('Training', {
                      screen: 'SessionRecap',
                      params: { programId: program.id, sessionId }
                    })
                  }
                />
              ))
            : null}
        </VStack>
      </ScrollView>
      {!programs.length && (
        <Box p={4}>
          <ProgramBlockPlaceholder
            onPress={() => {
              onCreateProgram((id) => navigation.navigate('ProgramsCreation', { id }));
            }}
          />
        </Box>
      )}
    </VStack>
  );
}
