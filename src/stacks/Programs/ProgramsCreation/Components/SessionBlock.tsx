import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, HStack, IconButton, Pressable, Text, VStack } from 'native-base';

import { ProgramSession, UID_V4 } from '@/store/Programs';

interface SessionBlockProps {
  session: ProgramSession;
  onOptionsPress: (id: UID_V4) => void;
  onEditPress: (id: UID_V4) => void;
  key: number | string;
}

export default function SessionBlock({
  session,
  onOptionsPress,
  key,
  onEditPress
}: SessionBlockProps) {
  return (
    <Pressable w="full">
      <Box w="full" backgroundColor="gray.200" rounded={4} overflow="hidden">
        <HStack backgroundColor={'gray.400'} px={2} py="2" justifyContent={'space-between'}>
          <HStack space={2}>
            {!!session.steps.length && <Badge p={1} />}
            <Text fontSize={'lg'}>{session.name}</Text>
          </HStack>
          <IconButton
            size="sm"
            p={1}
            onPress={() => onOptionsPress(session.id)}
            _icon={{
              as: Ionicons,
              color: 'gray.700',
              name: 'ellipsis-horizontal'
            }}
          />
        </HStack>
        <VStack p={2} space="2">
          {session.steps.length ? (
            session.steps.map((step, sIndex) => <Text key={`${key}-${sIndex}`}>{step.name}</Text>)
          ) : (
            <Text>Pas encore d'exercice</Text>
          )}
        </VStack>
        <Box p={2}>
          <Button onPress={() => onEditPress(session.id)}> Éditer la séance </Button>
        </Box>
      </Box>
    </Pressable>
  );
}
