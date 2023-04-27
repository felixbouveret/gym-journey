import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Box, Button, Icon, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

import { createProgramSession, getProgramSessions } from '@/api/BackPackAPI';
import BlockPlaceholder from '@/components/BlockPlaceholder';
import useActionSheet from '@/hooks/useActionSheet';
import usePrograms from '@/hooks/usePrograms';
import { ProgramsTabScreenProps } from '@/navigation/navigators/ProgramsNavigator';
import { ProgramSessionSimplified } from '@/types/Programs.types';

import SessionBlock from './Components/SessionBlock';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsCreation'>) {
  const [sessions, setSessions] = useState<ProgramSessionSimplified[]>([]);

  const { onDeleteSession, onUpdateSession } = usePrograms();
  const { displayActionSheet } = useActionSheet();

  const apiCall = async () => {
    const response = await getProgramSessions(route.params.id);

    setSessions(response.program_sessions);
  };

  useEffect(() => {
    apiCall();
    navigation.setOptions({
      title: route.params.name
    });
  }, []);

  const goToSession = (sessionId: string, sessionName?: string) => {
    navigation.navigate('ProgramsSession', {
      programId: route.params.id,
      sessionId,
      sessionName:
        sessionName || (sessions.find((session) => session.id === sessionId)?.name as string)
    });
  };

  const onProgramOptionsPress = (sessionId: string) =>
    displayActionSheet([
      { name: 'Annuler', isCancel: true, fcn: null },
      {
        name: 'Modifier',
        fcn: () => goToSession(sessionId)
      },
      { name: 'Renommer', fcn: () => onUpdateSession(route.params.id, sessionId) },
      {
        name: 'Supprimer',
        isDestructive: true,
        fcn: () => onDeleteSession(route.params.id, sessionId)
      }
    ]);

  const createSession = async () => {
    Alert.prompt('Nouvelle séance', 'Nom de la séance', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Créer',
        onPress: async (name) => {
          const sessionName = name ? name.trim() : 'Séance sans nom';
          try {
            const newSessionId = await createProgramSession(route.params.id, sessionName);
            await apiCall();
            goToSession(newSessionId, sessionName);
          } catch (e) {
            console.log(e);
          }
        }
      }
    ]);
  };

  return (
    <VStack h="full" w="full">
      <VStack flex="1">
        <DraggableFlatList
          style={{ width: '100%', paddingTop: 16, height: '100%' }}
          data={sessions}
          renderItem={({ item, drag, getIndex }) => (
            <Box p={4} pt={0} pb={getIndex() === sessions.length - 1 ? 8 : 4}>
              <ScaleDecorator>
                <SessionBlock
                  session={item}
                  onOptionsPress={() => onProgramOptionsPress(item.id)}
                  onPress={() => goToSession(item.id)}
                  onEditPress={() => goToSession(item.id)}
                  onLongPress={() => {
                    drag();
                    Haptics.impactAsync();
                  }}
                />
              </ScaleDecorator>
            </Box>
          )}
          keyExtractor={(item) => item.id as string}
        />
      </VStack>
      <VStack p={4} pt="0" space={4}>
        {!sessions?.length ? (
          <BlockPlaceholder
            onPress={() => createSession()}
            title="Créez vos séances."
            description="Listez toutes les séances de votre programme ici pour pouvoir les utiliser plus tard lors de vos entrainements."
            cta="Ajouter une séance"
          />
        ) : (
          <Button
            w="full"
            leftIcon={<Icon as={Ionicons} name="add" size="md" />}
            onPress={() => createSession()}
          >
            Ajouter une séance
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
