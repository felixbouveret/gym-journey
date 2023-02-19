import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, HStack, IconButton, Pressable, Text, VStack } from 'native-base';

import { Program, ProgramStatus } from '@/store/Programs';

interface ProgramBlockProps {
  program: Program;
  onOptionsPress: (name: string) => void;
  onEditPress: (name: string) => void;
  key: number | string;
}

export default function ProgramBlock({
  program,
  onOptionsPress,
  key,
  onEditPress
}: ProgramBlockProps) {
  const programStatus = () => {
    if (program.status === ProgramStatus.DRAFT)
      return { wording: 'Brouillon', colorScheme: 'info' };
    if (program.status === ProgramStatus.ACTIVE)
      return { wording: 'Actif', colorScheme: 'success' };
    if (program.status === ProgramStatus.ARCHIVED)
      return { wording: 'Archivé', colorScheme: 'default' };
  };
  return (
    <Pressable w="full">
      <Box w="full" backgroundColor="gray.200" rounded={4} overflow="hidden">
        <HStack backgroundColor={'gray.400'} px={2} py="2" justifyContent={'space-between'}>
          <HStack space={2}>
            <Badge p={1} colorScheme={programStatus()?.colorScheme}>
              {programStatus()?.wording}
            </Badge>
            <Text fontSize={'lg'}>{program.name}</Text>
          </HStack>
          <IconButton
            size="sm"
            p={1}
            onPress={() => onOptionsPress(program.name)}
            _icon={{
              as: Ionicons,
              color: 'gray.700',
              name: 'ellipsis-horizontal'
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
        {program.status === ProgramStatus.DRAFT && (
          <Box p={2}>
            <Button onPress={() => onEditPress(program.name)}> Éditer le programme </Button>
          </Box>
        )}
      </Box>
    </Pressable>
  );
}
