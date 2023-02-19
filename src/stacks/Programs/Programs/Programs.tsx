import { VStack } from 'native-base';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import usePrograms from '@/hooks/usePrograms';
import { RootState } from '@/store';
import { ProgramsTabScreenProps } from '@/types';

import ProgramBlock from './Components/ProgramBlock';
import ProgramBlockPlaceholder from './Components/ProgramBlockPlaceholder';

export default function ProgramsScreen({ navigation }: ProgramsTabScreenProps<'Programs'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
  const { onCreateProgram, onDeleteProgram } = usePrograms();

  const onProgramOptionsPress = (programName: string) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Anuler', 'Modifier', 'Supprimer'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1)
          return navigation.navigate('ProgramsCreation', { name: programName });
        else if (buttonIndex === 2) {
          onDeleteProgram(programName);
        }
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
          <ProgramBlock program={program} key={index} onOptionsPress={onProgramOptionsPress} />
        ))
      ) : (
        <ProgramBlockPlaceholder onPress={() => onCreateProgram(navigation)} />
      )}
    </VStack>
  );
}
