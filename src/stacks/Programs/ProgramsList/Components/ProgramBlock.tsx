import { Ionicons } from '@expo/vector-icons';
import { Badge, Button, HStack, Icon, IconButton, Pressable, Text, VStack } from 'native-base';
import { ColorSchemeType } from 'native-base/lib/typescript/components/types';

import useTime from '@/hooks/useTime';
import { Program, ProgramSession, ProgramStatus } from '@/store/Programs';

interface ProgramBlockProps {
  program: Program;
  onOptionsPress: () => void;
  onEditPress: () => void;
  onSessionPress: (session: ProgramSession) => void;
  key: number | string;
}

export default function ProgramBlock({
  program,
  onOptionsPress,
  key,
  onSessionPress,
  onEditPress
}: ProgramBlockProps) {
  const { getAverageTime } = useTime();

  const isDraft = program.status === ProgramStatus.DRAFT;
  const isArchived = program.status === ProgramStatus.ARCHIVED;

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
      <VStack space="2">
        {program.sessions.map((session, sIndex) => (
          <HStack key={`${key}-${sIndex}`} justifyContent="space-between">
            <Text fontSize={'md'} color="gray.500">
              {session.name}
            </Text>
            <Text fontSize={'md'} color="gray.500">
              {session.steps.length} exercice
            </Text>
          </HStack>
        ))}
      </VStack>
    ) : (
      <Text>Pas encore de séance</Text>
    );
  };

  const ActiveProgramSessionList = () => (
    <VStack space="2">
      {program.sessions.map((session, sIndex) => (
        <Pressable onPress={() => onSessionPress(session)}>
          <HStack
            justifyContent={'space-between'}
            backgroundColor={'gray.50'}
            key={sIndex}
            p={2}
            rounded={8}
            space={2}
            alignItems="center"
          >
            <HStack space={2} justifyContent={'space-between'}>
              <Badge>
                <Text>{getAverageTime(session.steps)}"</Text>
              </Badge>
              <Text fontSize={'md'} fontWeight="medium">
                {session.name}
              </Text>
            </HStack>
            <Text textAlign="right" flexGrow="1" color={'gray.500'}>
              {session.steps.length} exercices
            </Text>
            <Icon size="sm" as={Ionicons} flexShrink={0} color="gray.700" name="chevron-forward" />
          </HStack>
        </Pressable>
      ))}
    </VStack>
  );

  const ProgramSessionList = () => {
    if (isArchived) return null;
    if (isDraft) return EditingProgramSessionList();
    return ActiveProgramSessionList();
  };

  return (
    <Pressable w="full" onPress={isDraft ? onEditPress : null}>
      <VStack w="full" backgroundColor="white" rounded={8} overflow="hidden" p={4} space="4">
        <VStack w="full" space="4">
          <HStack justifyContent={'space-between'}>
            <HStack space={2} justifyContent={'space-between'} alignItems="center">
              <Text fontSize={'lg'} color="gray.700" fontWeight={'medium'}>
                {program.name}
              </Text>
              <Badge colorScheme={programStatus()?.colorScheme}>{programStatus()?.wording}</Badge>
              {isArchived && (
                <Text textAlign={'right'} color="gray.500">
                  {program.sessions.length} séances
                </Text>
              )}
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
          {ProgramSessionList()}
        </VStack>
        {isDraft && <Button onPress={onEditPress}> Éditer le programme </Button>}
      </VStack>
    </Pressable>
  );
}
