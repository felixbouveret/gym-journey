import { Badge, HStack, Pressable, Text, VStack } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';

import { ProgramSession, UID_V4 } from '@/store/Programs';

interface SessionBlockProps {
  session: ProgramSession;
  rightAction?: React.ReactNode;
  footer?: React.ReactNode;
  onPress?: (id: UID_V4) => void;
  key: number | string;
  backgroundColor?: ColorType;
}

export default function SessionBlock({
  session,
  rightAction,
  footer,
  key,
  onPress,
  backgroundColor
}: SessionBlockProps) {
  const averageTime = session.steps.reduce(
    (acc, step) => acc + (Number(step.restTime) + 1) * Number(step.setNumber),
    0
  );

  return (
    <Pressable w="full" onPress={() => onPress && onPress(session.id)}>
      <VStack
        w="full"
        backgroundColor={backgroundColor || 'white'}
        rounded={8}
        overflow="hidden"
        p={4}
        space="4"
      >
        <VStack w="full" space="2">
          <HStack justifyContent={'space-between'}>
            <HStack space={2} justifyContent={'space-between'}>
              <Text fontSize={'xl'} fontWeight="medium">
                {session.name}
              </Text>
              <Badge>
                <Text>{averageTime}"</Text>
              </Badge>
            </HStack>
            {rightAction()}
          </HStack>
          <VStack>
            {session.steps.length ? (
              session.steps.map((step, sIndex) => (
                <HStack justifyContent={'space-between'} key={`${key}-${sIndex}`}>
                  <Text fontSize={'md'} color="gray.500">
                    {step.name}
                  </Text>
                  <Text fontSize={'md'} color="gray.500">
                    {step.setNumber} x {step.reps} @ {step.weight} kg
                  </Text>
                </HStack>
              ))
            ) : (
              <Text fontSize={'md'} color="gray.500">
                Pas encore d'exercice
              </Text>
            )}
          </VStack>
        </VStack>
        {footer}
      </VStack>
    </Pressable>
  );
}
