import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, HStack, Icon, ScrollView, Text, View, VStack } from 'native-base';
import { useState } from 'react';

import { RootTabScreenProps } from '@/types';
import { Exercice } from '@/types/Exercices.types';

export default function ExercicesScreen({ navigation }: RootTabScreenProps<'Exercices'>) {
  const [exercices, setExercices] = useState<Exercice[]>([]);

  const Wrapper = exercices?.length ? ScrollView : View;

  const exercicesList = exercices?.map((exercice, index) => (
    <Box rounded={8} p={4} backgroundColor="white" key={index}>
      <VStack space={1}>
        <HStack justifyContent={'space-between'}>
          <Text color={'gray.700'} fontSize="xl">
            {exercice.name}
          </Text>
          {exercice?.isUnilateral ? <Badge>Unilateral</Badge> : null}
        </HStack>

        <Text color={'gray.700'}>{exercice?.description}</Text>
      </VStack>
    </Box>
  ));

  return (
    <Wrapper w="full" h="full">
      <VStack h="full" padding={4} justifyContent={exercices?.length ? '' : 'flex-end'} space={4}>
        {exercices?.length ? (
          exercicesList
        ) : (
          <Box
            rounded={8}
            p={4}
            backgroundColor="gray.200"
            borderColor={'gray.400'}
            borderStyle="dashed"
            borderWidth={2}
          >
            <VStack space={1}>
              <Text color={'gray.500'} fontSize="xl">
                Pas d'exercices
              </Text>
              <Text color={'gray.500'}>Créez en ici ou pendant la création de votre programme</Text>
            </VStack>
          </Box>
        )}
        <Button
          w="full"
          leftIcon={<Icon as={Ionicons} name="add" size="md" />}
          onPress={() => navigation.navigate('ExerciceModal')}
        >
          Ajouter un exercice
        </Button>
      </VStack>
    </Wrapper>
  );
}
