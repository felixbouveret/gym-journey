import { Ionicons } from '@expo/vector-icons';
import { Button, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import useSessions from '@/hooks/useSessions';
import { RootState } from '@/store';
import { UID_V4 } from '@/store/Programs';
import { ProgramsTabScreenProps } from '@/types';

import SessionBlock from './Components/SessionBlock';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsCreation'>) {
  const { programs } = useSelector((state: RootState) => state.programs);

  const currentProgram = programs.find((program) => program.id === route.params.id);

  const { onCreateSession, onDeleteSession, onUpdateSession } = useSessions();

  useEffect(() => {
    navigation.setOptions({
      title: currentProgram?.name
    });
  }, [currentProgram?.name]);

  const onProgramOptionsPress = (id: UID_V4) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Annuler', 'Modifier', 'Renommer', 'Supprimer'],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0
      },
      (buttonIndex) => {
        if (buttonIndex === 0) return;
        if (buttonIndex === 1)
          return navigation.navigate('ProgramsSession', {
            programId: route.params.id,
            sessionId: id
          });
        if (buttonIndex === 2) return onUpdateSession(route.params.id, id);
        if (buttonIndex === 3) return onDeleteSession(route.params.id, id);
      }
    );

  return (
    <VStack
      justifyContent={currentProgram?.sessions.length ? '' : 'flex-end'}
      h="full"
      w="full"
      p={4}
      space="4"
    >
      {currentProgram?.sessions.length ? (
        <VStack flex={1} w="full" space="4">
          {currentProgram.sessions.map((session, index) => (
            <SessionBlock
              session={session}
              key={index}
              onOptionsPress={onProgramOptionsPress}
              onEditPress={(id) =>
                navigation.navigate('ProgramsSession', {
                  programId: route.params.id,
                  sessionId: id
                })
              }
            />
          ))}
        </VStack>
      ) : null}
      <Button
        w="full"
        leftIcon={<Icon as={Ionicons} name="add" size="md" />}
        onPress={() => onCreateSession(route.params.id)}
      >
        Ajouter une séance
      </Button>
    </VStack>
  );
}
