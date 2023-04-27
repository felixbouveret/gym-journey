import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Box, Button, Icon, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

import { getProgramSession } from '@/api/BackPackAPI';
import SessionStep from '@/components/SessionStep';
import useActionSheet from '@/hooks/useActionSheet';
import { ProgramsTabScreenProps } from '@/navigation/navigators/ProgramsNavigator';
import { ProgramSession } from '@/types/Programs.types';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsSession'>) {
  const [session, setSession] = useState<ProgramSession>();
  const sessionSteps = session?.steps || [];

  const { displayActionSheet } = useActionSheet();

  const apiCall = async () => {
    try {
      const response = await getProgramSession(route.params.sessionId);
      setSession(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    apiCall();

    navigation.setOptions({
      title: route.params.sessionName
    });
  }, []);

  const openModal = (stepId?: string) => {
    navigation.navigate('ProgramsExerciceModal', {
      programId: route.params.programId,
      sessionId: route.params.sessionId,
      stepId
    });
  };

  const removeStep = (stepId: string) => null;

  const onStepOption = (stepId: string) =>
    displayActionSheet([
      { name: 'Annuler', isCancel: true, fcn: null },
      {
        name: 'Modifier',
        fcn: () => openModal(stepId)
      },
      {
        name: 'Supprimer',
        isDestructive: true,
        fcn: () => removeStep(stepId)
      }
    ]);

  return (
    <VStack h="full" w="full" pt="0">
      <VStack flex="1" w="full" space={4}>
        <DraggableFlatList
          style={{ width: '100%', height: '100%', padding: 16 }}
          data={sessionSteps}
          renderItem={({ item: step, drag }) => (
            <Box pb="2">
              <ScaleDecorator>
                <SessionStep
                  step={step}
                  onLongPress={() => {
                    drag();
                    Haptics.impactAsync();
                  }}
                  onOptions={() => onStepOption(step.id)}
                />
              </ScaleDecorator>
            </Box>
          )}
          keyExtractor={(item) => item.id as string}
        />
      </VStack>
      <VStack p={4} pt="0" space={4}>
        <Button
          w="full"
          leftIcon={<Icon as={Ionicons} name="add" size="md" />}
          onPress={() => openModal()}
        >
          Ajouter un exercice
        </Button>
      </VStack>
    </VStack>
  );
}
