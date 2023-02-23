import { Ionicons } from '@expo/vector-icons';
import { Badge, Button, HStack, Icon, IconButton, Pressable, Text, VStack } from 'native-base';
import { ColorSchemeType } from 'native-base/lib/typescript/components/types';

import SessionBlock from '@/components/SessionBlock';
import { Program, ProgramStatus, UID_V4 } from '@/store/Programs';

interface ProgramBlockProps {
  program: Program;
  onOptionsPress: () => void;
  onEditPress: () => void;
  onSessionPress: (id: UID_V4) => void;
  key: number | string;
}

export default function ProgramBlock({
  program,
  onOptionsPress,
  key,
  onSessionPress,
  onEditPress
}: ProgramBlockProps) {
  const isDraft = program.status === ProgramStatus.DRAFT;

  const programStatus = (): { wording: string; colorScheme: ColorSchemeType } | void => {
    if (program.status === ProgramStatus.DRAFT)
      return { wording: 'Brouillon', colorScheme: 'info' };
    if (program.status === ProgramStatus.ACTIVE)
      return { wording: 'Actif', colorScheme: 'success' };
    if (program.status === ProgramStatus.ARCHIVED)
      return { wording: 'Archivé', colorScheme: 'warmGray' };
  };

  const EditingProgramSessionList = () => {
    return program.sessions.length ? (
      program.sessions.map((session, sIndex) => (
        <HStack key={`${key}-${sIndex}`} justifyContent="space-between">
          <Text fontSize={'md'} color="gray.500">
            {session.name}
          </Text>
          <Text fontSize={'md'} color="gray.500">
            {session.steps.length} exercice
          </Text>
        </HStack>
      ))
    ) : (
      <Text>Pas encore de séance</Text>
    );
  };

  const ActiveProgramSessionList = () =>
    program.sessions.map((session, sIndex) => (
      <SessionBlock
        session={session}
        key={sIndex}
        backgroundColor={'gray.50'}
        onPress={() => onSessionPress(session.id)}
        rightAction={() => (
          <Icon size="sm" p={1} as={Ionicons} color="gray.700" name="chevron-forward" />
        )}
      />
    ));

  return (
    <Pressable w="full" onPress={isDraft ? onEditPress : null}>
      <VStack w="full" backgroundColor="white" rounded={8} overflow="hidden" p={4} space="4">
        <VStack w="full" space="4">
          <HStack justifyContent={'space-between'}>
            <HStack space={2} justifyContent={'space-between'}>
              <Text fontSize={'lg'} color="gray.700" fontWeight={'medium'}>
                {program.name}
              </Text>
              <Badge colorScheme={programStatus()?.colorScheme}>{programStatus()?.wording}</Badge>
            </HStack>
            <IconButton
              size="sm"
              p={1}
              onPress={onOptionsPress}
              _icon={{
                as: Ionicons,
                color: 'gray.700',
                name: 'ellipsis-horizontal'
              }}
            />
          </HStack>
          <VStack space={4}>
            {isDraft ? EditingProgramSessionList() : ActiveProgramSessionList()}
          </VStack>
        </VStack>
        {isDraft && <Button onPress={onEditPress}> Éditer le programme </Button>}
      </VStack>
    </Pressable>
  );
}
