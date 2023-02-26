import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Icon, ScrollView, VStack } from 'native-base';
import { useEffect } from 'react';
import { ActionSheetIOS } from 'react-native';
import { useSelector } from 'react-redux';

import usePrograms from '@/hooks/usePrograms';
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

  const { onCreateSession, onDeleteSession, onUpdateSession } = usePrograms();

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
    <VStack h="full" w="full">
      <ScrollView>
        {currentProgram?.sessions.length ? (
          <VStack flex={1} w="full" space="4" p={4}>
            {currentProgram.sessions.map((session, index) => (
              <SessionBlock
                session={session}
                key={index}
                onOptionsPress={onProgramOptionsPress}
                onPress={(id) =>
                  navigation.navigate('ProgramsSession', {
                    programId: route.params.id,
                    sessionId: id
                  })
                }
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
      </ScrollView>
      <Box p={4} pt="0">
        <Button
          w="full"
          leftIcon={<Icon as={Ionicons} name="add" size="md" />}
          onPress={() => onCreateSession(route.params.id)}
        >
          Ajouter une séance
        </Button>
      </Box>
    </VStack>
  );
}
