import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, HStack, IconButton, Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramsTabScreenProps } from '@/types';

export default function ProgramsCreationScreen({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsCreation'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
  const currentProgram = programs.find((program) => program.name === route.params.name);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name
    });
  }, [route.params?.name]);

  const onPress = async () => {
    Alert.prompt('Nouveau programme', 'Nom du programme', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Créer',
        onPress: (sessionName) => {
          //create program
          navigation.navigate('ProgramsSession', {
            sessionName: sessionName ? sessionName : 'Sans nom'
          });
        }
      }
    ]);
  };

  return (
    <VStack justifyContent={'center'} alignItems="center" h="full" w="full">
      {currentProgram?.sessions.length ? (
        currentProgram.sessions.map((session, index) => (
          <Box key={index} w="full" backgroundColor="gray.200" rounded={4} overflow="hidden">
            <HStack backgroundColor={'gray.400'} px={2} py="1" justifyContent={'space-between'}>
              <Text fontSize={'lg'}>{session.name}</Text>
              <IconButton
                size="sm"
                p={0}
                onPress={() =>
                  navigation.navigate('ProgramsSession', {
                    sessionName: session.name,
                    editing: true
                  })
                }
                _icon={{
                  as: MaterialIcons,
                  name: 'more-vert'
                }}
              />
            </HStack>
            <VStack p={2} space="2">
              {session.steps.length ? (
                session.steps.map((step, sIndex) => (
                  <Text key={`${index}-${sIndex}`}>{step.name}</Text>
                ))
              ) : (
                <Text>Pas encore de séance</Text>
              )}
            </VStack>
          </Box>
        ))
      ) : (
        <Text>Pas encore de séance</Text>
      )}
      <Button onPress={onPress}>To prog</Button>
    </VStack>
  );
}
