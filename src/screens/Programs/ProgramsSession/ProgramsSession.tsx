import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Box, Button, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import { ActionSheetIOS } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';

import SessionStep from '@/components/SessionStep';
import usePrograms from '@/hooks/usePrograms';
import { RootState } from '@/store';
import { setSessionSteps } from '@/store/Programs';
import { ProgramsTabScreenProps } from '@/types';
import { UID_V4 } from '@/types/Exercices.types';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsSession'>) {
  const dispatch = useDispatch();
  const { programs } = useSelector((state: RootState) => state.programs);
  const { onRemoveSessionStep } = usePrograms();

  const currentProgram = programs.find((program) => program.id === route.params.programId);
  const currentSession = currentProgram?.sessions.find(
    (session) => session.id === route.params.sessionId
  );

  const sessionSteps = currentSession?.steps || [];

  const onOptions = (id: UID_V4) =>
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
            stepId: id
          });
        if (buttonIndex === 2)
          return onRemoveSessionStep({
            programId: route.params.programId,
            sessionId: route.params.sessionId,
            stepId: id
          });
      }
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
      pt="0"
    >
      <VStack flex="1" w="full" space={4}>
        {!!sessionSteps.length && (
          <DraggableFlatList
            style={{ width: '100%', height: '100%', padding: 16 }}
            data={sessionSteps}
            renderItem={({ item, drag }) => (
              <Box pb="2">
                <ScaleDecorator>
                  <SessionStep
                    item={item}
                    onLongPress={() => {
                      drag();
                      Haptics.impactAsync();
                    }}
                    onOptions={() => onOptions(item.id)}
                  />
                </ScaleDecorator>
              </Box>
            )}
            keyExtractor={(item) => item.id as string}
            onDragEnd={({ data }) =>
              dispatch(setSessionSteps(route.params.programId, route.params.sessionId, data))
            }
          />
        )}
      </VStack>
      <VStack p={4} pt="0" space={4}>
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
    </VStack>
  );
}
