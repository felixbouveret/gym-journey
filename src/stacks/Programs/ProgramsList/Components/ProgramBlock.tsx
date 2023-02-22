import { Ionicons } from '@expo/vector-icons';
import { Badge, Button, HStack, IconButton, Pressable, Text, VStack } from 'native-base';

import { Program, ProgramStatus, UID_V4 } from '@/store/Programs';

interface ProgramBlockProps {
  program: Program;
  onOptionsPress: (id: UID_V4) => void;
  onEditPress: (id: UID_V4) => void;
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
    <Pressable w="full" onPress={() => onEditPress(program.id)}>
      <VStack w="full" backgroundColor="white" rounded={8} overflow="hidden" p={4} space="4">
        <VStack w="full" space="2">
          <HStack justifyContent={'space-between'}>
            <HStack space={2} justifyContent={'space-between'}>
              <Text fontSize={'lg'}>{program.name}</Text>
              <Badge colorScheme={programStatus()?.colorScheme}>{programStatus()?.wording}</Badge>
            </HStack>
            <IconButton
              size="sm"
              p={1}
              onPress={() => onOptionsPress(program.id)}
              _icon={{
                as: Ionicons,
                color: 'gray.700',
                name: 'ellipsis-horizontal'
              }}
            />
          </HStack>
          <VStack>
            {program.sessions.length ? (
              program.sessions.map((session, sIndex) => (
                <Text fontSize={'md'} color="gray.500" key={`${key}-${sIndex}`}>
                  {session.name} - {session.steps.length} exercice
                </Text>
              ))
            ) : (
              <Text>Pas encore de séance</Text>
            )}
          </VStack>
        </VStack>
        {program.status === ProgramStatus.DRAFT && (
          <Button onPress={() => onEditPress(program.id)}> Éditer le programme </Button>
        )}
      </VStack>
    </Pressable>
  );
}
