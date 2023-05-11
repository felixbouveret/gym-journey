import { HStack, Text, VStack } from 'native-base';

import { ProgramSessionStep } from '@/types/Programs.types';

interface NormalSetProps {
  step: ProgramSessionStep;
}

export default function NormalSet({ step }: NormalSetProps) {
  const exercice = step.exercices[0];
  return (
    <VStack flex="1" space="2">
      <HStack alignItems="center" justifyContent={'space-between'} space="2">
        <Text fontSize={'lg'} fontWeight="medium" lineBreakMode="head" numberOfLines={1} flex="1">
          {exercice.name}
        </Text>
        <Text fontSize={'lg'}>{exercice.weight} kg</Text>
      </HStack>
      <HStack space={8} justifyContent={'space-between'}>
        <HStack space={4} justifyContent={'space-between'}>
          <Text color={'gray.500'} fontSize={'sm'}>
            {step.set_number} sets
          </Text>
          <Text color={'gray.500'} fontSize={'sm'}>
            {exercice.reps} reps
          </Text>
        </HStack>
        <Text color={'gray.500'} fontSize={'sm'}>
          {step.rest_time} min
        </Text>
      </HStack>
    </VStack>
  );
}
