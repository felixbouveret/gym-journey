import { Ionicons } from '@expo/vector-icons';
import { Button, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramsTabScreenProps } from '@/types';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsSession'>) {
  const { programs } = useSelector((state: RootState) => state.programs);

  const currentProgram = programs.find((program) => program.id === route.params.programId);
  const currentSession = currentProgram?.sessions.find(
    (session) => session.id === route.params.sessionId
  );

  useEffect(() => {
    navigation.setOptions({
      title: currentSession?.name
    });
  }, [currentSession?.name]);

  return (
    <VStack
      justifyContent={currentSession?.steps.length ? '' : 'flex-end'}
      h="full"
      w="full"
      p={4}
      space="4"
    >
      <Button
        w="full"
        leftIcon={<Icon as={Ionicons} name="add" size="md" />}
        onPress={() => navigation.navigate('ProgramsExerciceModal', {})}
      >
        Ajouter un exercice
      </Button>
    </VStack>
  );
}
