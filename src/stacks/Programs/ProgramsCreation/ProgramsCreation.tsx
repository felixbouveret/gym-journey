import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Box, Button, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import { ActionSheetIOS } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';

import BlockPlaceholder from '@/components/BlockPlaceholder';
import usePrograms from '@/hooks/usePrograms';
import { RootState } from '@/store';
import { setSessions, UID_V4 } from '@/store/Programs';
import { ProgramsTabScreenProps } from '@/types';

import SessionBlock from './Components/SessionBlock';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsCreation'>) {
  const dispatch = useDispatch();

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

  const goToSession = (id: UID_V4) => {
    navigation.navigate('ProgramsSession', {
      programId: route.params.id,
      sessionId: id
    });
  };

  return (
    <VStack h="full" w="full">
      <VStack flex="1">
        {!!currentProgram?.sessions.length && (
          <DraggableFlatList
            style={{ width: '100%', paddingTop: 16 }}
            data={currentProgram.sessions}
            renderItem={({ item, drag, getIndex }) => (
              <Box p={4} pt={0} pb={getIndex() === currentProgram.sessions.length - 1 ? 8 : 4}>
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
        {!currentProgram?.sessions.length ? (
          <BlockPlaceholder
            onPress={() => onCreateSession(route.params.id, goToSession)}
            title="Créez vos séances."
            description="Listez toutes les séances de votre programme ici pour pouvoir les utiliser plus tard lors de vos entrainements."
            cta="Ajouter une séance"
          />
        ) : (
          <Button
            w="full"
            leftIcon={<Icon as={Ionicons} name="add" size="md" />}
            onPress={() => onCreateSession(route.params.id, goToSession)}
          >
            Ajouter une séance
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
