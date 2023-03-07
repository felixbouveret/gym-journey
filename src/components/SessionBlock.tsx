import { Badge, HStack, Pressable, Text, VStack } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramSession, ProgramSessionStep, UID_V4 } from '@/store/Programs';
import { ExerciceType } from '@/types/Exercices.types';

interface SessionBlockProps {
  session: ProgramSession;
  rightAction?: JSX.Element;
  footer?: JSX.Element;
  onPress?: (id: UID_V4) => void;
  backgroundColor?: ColorType;
}

export default function SessionBlock({
  session,
  rightAction,
  footer,
  onPress,
  backgroundColor
}: SessionBlockProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);

  const averageTime = session.steps.reduce(
    (acc, step) => acc + (Number(step.restTime) + 1) * Number(step.setNumber),
    0
  );

  const exercice = (step: ProgramSessionStep) => {
    if (step.type === ExerciceType.SUPERSET)
      return (
        <VStack w="full" py={2}>
          <Text>Superset</Text>
          <VStack w="full" px={2} pr={0}>
            {step.exercices.map((e, index) => (
              <VStack space="2" key={index}>
                <HStack alignItems="center" justifyContent={'space-between'}>
                  <Text fontWeight="medium" lineBreakMode="head" numberOfLines={1} flex="1">
                    {exercices.find((exerciceItem) => exerciceItem.id === e.exerciceId)?.name}
                  </Text>
                  <Text fontSize={'md'} color="gray.500">
                    {step.setNumber} x {e.reps} @ {e.weight} kg
                  </Text>
                </HStack>
              </VStack>
            ))}
          </VStack>
        </VStack>
      );
    return step.exercices.map((e, index) => (
      <HStack alignItems="center" justifyContent={'space-between'} key={index} w="full" space={2}>
        <Text fontWeight="medium" lineBreakMode="head" numberOfLines={1} flex="1">
          {exercices.find((exerciceItem) => exerciceItem.id === e.exerciceId)?.name}
        </Text>
        <Text color={'gray.500'} fontSize={'md'}>
          {step.setNumber} x {e.reps} @ {e.weight} kg
        </Text>
      </HStack>
    ));
  };

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
            {rightAction}
          </HStack>
          <VStack>
            {session.steps.length ? (
              session.steps.map((step, sIndex) => (
                <HStack justifyContent={'space-between'} key={sIndex}>
                  {exercice(step)}
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
