import { Ionicons } from '@expo/vector-icons';
import { Button, Icon, ScrollView, VStack } from 'native-base';
import { useEffect } from 'react';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import useSessions from '@/hooks/useSessions';
import { RootState } from '@/store';
import { ProgramsTabScreenProps } from '@/types';

import SessionStep from './components/SessionStep';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsSession'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
  const { onRemoveSessionStep } = useSessions();

  const currentProgram = programs.find((program) => program.id === route.params.programId);
  const currentSession = currentProgram?.sessions.find(
    (session) => session.id === route.params.sessionId
  );
  const onOptions = (exerciceName: string) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Modifier', 'Supprimer'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1)
          return navigation.navigate('ProgramsExerciceModal', {
            programId: route.params.programId,
            sessionId: route.params.sessionId,
            exerciceName
          });
        if (buttonIndex === 2)
          return onRemoveSessionStep({
            programId: route.params.programId,
            sessionId: route.params.sessionId,
            stepName: exerciceName
          });
      }
    );

  useEffect(() => {
    navigation.setOptions({
      title: currentSession?.name
    });
  }, [currentSession?.name]);

  return (
    <ScrollView>
      <VStack
        justifyContent={currentSession?.steps.length ? '' : 'flex-end'}
        h="full"
        w="full"
        p={4}
        space="4"
      >
        {currentSession?.steps.length
          ? currentSession?.steps.map((step, index) => (
              <SessionStep step={step} key={index} onOptions={onOptions} />
            ))
          : null}
        <Button
          w="full"
          leftIcon={<Icon as={Ionicons} name="add" size="md" />}
          onPress={() =>
            navigation.navigate('ProgramsExerciceModal', {
              programId: route.params.programId,
              sessionId: route.params.sessionId
            })
          }
        >
          Ajouter un exercice
        </Button>
      </VStack>
    </ScrollView>
  );
}
