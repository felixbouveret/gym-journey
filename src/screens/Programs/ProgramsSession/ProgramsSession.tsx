import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Box, Button, Icon, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { ActionSheetIOS } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useDispatch } from 'react-redux';

import { getProgramSession } from '@/api/BackPackAPI';
import SessionStep from '@/components/SessionStep';
import usePrograms from '@/hooks/usePrograms';
import { ProgramsTabScreenProps } from '@/navigation/navigators/ProgramsNavigator';
import { setSessionSteps } from '@/store/Programs';
import { UID_V4 } from '@/types/global.types';
import { ProgramSession } from '@/types/Programs.types';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsSession'>) {
  const dispatch = useDispatch();
  const { onRemoveSessionStep } = usePrograms();
  const [session, setSession] = useState<ProgramSession | undefined>(undefined);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response = await getProgramSession(route.params.sessionId);
        setSession(response.programs);
      } catch (error) {
        console.error(error);
      }
    };
    apiCall();
  }, []);

  const sessionSteps = session?.steps || [];

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
      title: session?.name
    });
  }, [session?.name]);

  return (
    <VStack justifyContent={session?.steps.length ? '' : 'flex-end'} h="full" w="full" pt="0">
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
