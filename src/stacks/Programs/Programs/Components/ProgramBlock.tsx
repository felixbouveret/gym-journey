import { MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Pressable, Text, VStack } from 'native-base';

import { Program } from '@/store/Programs';

interface ProgramBlockProps {
  program: Program;
  onOptionsPress: (name: string) => void;
  key: number | string;
}

export default function ProgramBlock({ program, onOptionsPress, key }: ProgramBlockProps) {
  return (
    <Pressable w="full">
      <Box w="full" backgroundColor="gray.200" rounded={4} overflow="hidden">
        <HStack backgroundColor={'gray.400'} px={2} py="1" justifyContent={'space-between'}>
          <Text fontSize={'lg'}>{program.name}</Text>
          <IconButton
            size="sm"
            p={0}
            onPress={() => onOptionsPress(program.name)}
            _icon={{
              as: MaterialIcons,
              color: 'gray.700',
              name: 'more-vert'
            }}
          />
        </HStack>
        <VStack p={2} space="2">
          {program.sessions.length ? (
            program.sessions.map((session, sIndex) => (
              <Text key={`${key}-${sIndex}`}>{session.name}</Text>
            ))
          ) : (
            <Text>Pas encore de séance</Text>
          )}
        </VStack>
      </Box>
    </Pressable>
  );
}
