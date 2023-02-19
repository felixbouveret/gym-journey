import { Ionicons } from '@expo/vector-icons';
import { Button, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramsTabScreenProps } from '@/types';

import SessionBlock from './Components/SessionBlock';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsCreation'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
  const currentProgram = programs.find((program) => program.id === route.params.id);

  useEffect(() => {
    navigation.setOptions({
      title: currentProgram?.name
    });
  }, [currentProgram?.name]);

  const onPress = async () => {
    Alert.prompt('Nouveau programme', 'Nom du programme', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Créer',
        onPress: (sessionId) => {
          navigation.navigate('ProgramsSession', {
            sessionId: sessionId
          });
        }
      }
    ]);
  };

  return (
    <VStack
      justifyContent={currentProgram?.sessions.length ? '' : 'flex-end'}
      alignItems="center"
      h="full"
      w="full"
      p={4}
      space="4"
    >
      {currentProgram?.sessions.length
        ? currentProgram.sessions.map((session, index) => (
            <SessionBlock
              session={session}
              key={index}
              onOptionsPress={() => null}
              onEditPress={() => null}
            />
          ))
        : null}
      <Button w="full" leftIcon={<Icon as={Ionicons} name="add" size="md" />} onPress={onPress}>
        Ajouter une séance
      </Button>
    </VStack>
  );
}
