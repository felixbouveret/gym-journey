import { Box, Text, VStack } from 'native-base';

import { ExercicesTabScreenProps } from '@/types';

export default function ExerciceSingle({ id }: ExercicesTabScreenProps<'ExerciceSingle'>) {
  return (
    <VStack w="full" h="full">
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
            {id}
          </Text>
          <Text color={'gray.500'}>Créez en ici ou pendant la création de votre programme</Text>
        </VStack>
      </Box>
    </VStack>
  );
}
