import { ScrollView, VStack } from 'native-base';
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
  const { onCreateProgram, onDeleteProgram, onUpdateProgram, onArchiveProgram } = usePrograms();

  const onProgramOptionsPress = (id: UID_V4, status: ProgramStatus) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Annuler',
          'Modifier',
          status === ProgramStatus.ACTIVE ? 'Archiver' : 'Renommer',
          'Supprimer'
        ],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1) return navigation.navigate('ProgramsCreation', { id: id });
        if (buttonIndex === 2)
          return status === ProgramStatus.ACTIVE ? onArchiveProgram(id) : onUpdateProgram(id);
        if (buttonIndex === 3) return onDeleteProgram(id);
      }
    );

  return (
    <ScrollView>
      <VStack
        justifyContent={programs.length ? '' : 'flex-end'}
        alignItems="center"
        h="full"
        w="full"
        p={4}
        space="4"
      >
        {programs.length ? (
          programs.map((program, index) => (
            <ProgramBlock
              program={program}
              key={index}
              onOptionsPress={() => onProgramOptionsPress(program.id, program.status)}
              onEditPress={() => navigation.navigate('ProgramsCreation', { id: program.id })}
              onSessionPress={() => navigation.navigate('Training')}
            />
          ))
        ) : (
          <ProgramBlockPlaceholder
            onPress={() => {
              onCreateProgram((id) => navigation.navigate('ProgramsCreation', { id }));
            }}
          />
        )}
      </VStack>
    </ScrollView>
  );
}
