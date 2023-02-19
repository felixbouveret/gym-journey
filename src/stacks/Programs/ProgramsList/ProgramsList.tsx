import { VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import usePrograms from '@/hooks/usePrograms';
import { RootState } from '@/store';
import { UID_V4 } from '@/store/Programs';
import { ProgramsTabScreenProps } from '@/types';

import ProgramBlock from './Components/ProgramBlock';
import ProgramBlockPlaceholder from './Components/ProgramBlockPlaceholder';

export default function ProgramsListStack({ navigation }: ProgramsTabScreenProps<'Programs'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
  const { onCreateProgram, onDeleteProgram, onUpdateProgram } = usePrograms();

  const onProgramOptionsPress = (id: UID_V4) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Modifier', 'Renommer', 'Supprimer'],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1) return navigation.navigate('ProgramsCreation', { id: id });
        if (buttonIndex === 2) return onUpdateProgram(id);
        if (buttonIndex === 3) return onDeleteProgram(id);
      }
    );

  return (
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
            onOptionsPress={onProgramOptionsPress}
            onEditPress={(id) => navigation.navigate('ProgramsCreation', { id })}
          />
        ))
      ) : (
        <ProgramBlockPlaceholder onPress={onCreateProgram} />
      )}
    </VStack>
  );
}
