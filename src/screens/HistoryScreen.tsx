import { Box, Text, VStack } from 'native-base';

import { RootTabScreenProps } from '@/types';

export default function HistoryScreen({}: RootTabScreenProps<'History'>) {
  return (
    <VStack w="full" h="full" p={4} justifyContent="center">
      <Box
        rounded={8}
        p={4}
        backgroundColor="gray.200"
        borderColor={'gray.400'}
        borderStyle="dashed"
        borderWidth={2}
      >
        <Text color={'gray.500'} fontSize="xl" textAlign={'center'}>
          HistoryScreen in progress...
        </Text>
      </Box>
    </VStack>
  );
}
