import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Box, Button, Icon, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ActionSheetIOS, Alert } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';

import { createProgramSession, getProgramSessions } from '@/api/BackPackAPI';
import BlockPlaceholder from '@/components/BlockPlaceholder';
import usePrograms from '@/hooks/usePrograms';
import { ProgramsTabScreenProps } from '@/navigation/navigators/ProgramsNavigator';
import { UID_V4 } from '@/types/global.types';
import { ProgramSession } from '@/types/Programs.types';

import SessionBlock from './Components/SessionBlock';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsCreation'>) {
  const dispatch = useDispatch();

  const [programName, setProgramName] = useState<string>('');
  const [sessions, setSessions] = useState<ProgramSession[] | undefined>(undefined);

  const { onDeleteSession, onUpdateSession } = usePrograms();

  useEffect(() => {
    const apiCall = async () => {
      const response = await getProgramSessions(route.params.id);

      setProgramName('response.name');
      setSessions(response.program_sessions);
    };
    apiCall();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: programName
    });
  }, [programName]);

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

  const goToSession = (id: UID_V4) => {
    navigation.navigate('ProgramsSession', {
      programId: route.params.id,
      sessionId: id
    });
  };

  const createSession = async () => {
    Alert.prompt('Nouvelle séance', 'Nom de la séance', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Créer',
        onPress: async (name) => {
          const sessionName = name ? name.trim() : 'Séance sans nom';
          try {
            setSessions((prev) => [
              ...(prev || []),
              {
                id: '' as UID_V4,
                program_id: route.params.id as UID_V4,
                name: sessionName,
                exercices_number: 0,
                steps: []
              }
            ]);
            const newSessionId = await createProgramSession(route.params.id, sessionName);
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
        {!!sessions?.length && (
          <DraggableFlatList
            style={{ width: '100%', paddingTop: 16, height: '100%' }}
            data={sessions}
            renderItem={({ item, drag, getIndex }) => (
              <Box p={4} pt={0} pb={getIndex() === sessions.length - 1 ? 8 : 4}>
                <ScaleDecorator>
                  <SessionBlock
                    session={item}
                    onOptionsPress={onProgramOptionsPress}
                    onPress={(id) => goToSession(id)}
                    onEditPress={(id) => goToSession(id)}
                    onLongPress={() => {
                      drag();
                      Haptics.impactAsync();
                    }}
                  />
                </ScaleDecorator>
              </Box>
            )}
            keyExtractor={(item) => item.id as string}
            onDragEnd={({ data }) => dispatch(setSessions(route.params.id, data))}
          />
        )}
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
