import { Badge, HStack, Text, VStack } from 'native-base';

import { ProgramSessionStep } from '@/types/Programs.types';

interface SuperSetProps {
  step: ProgramSessionStep;
}

export default function SuperSet({ step }: SuperSetProps) {
  return (
    <VStack flex="1" space="2">
      <HStack alignItems="center" justifyContent={'space-between'}>
        <Badge>Superset</Badge>
      </HStack>

      {step.program_sessions_step.map((exercice, index) => (
        <VStack flex="1" space="2" key={index}>
          <HStack alignItems="center" justifyContent={'space-between'} space="2">
            <Text
              fontSize={'lg'}
              fontWeight="medium"
              lineBreakMode="head"
              numberOfLines={1}
              flex="1"
            >
              {exercice.name}
            </Text>
            <HStack alignItems="center" justifyContent={'space-between'} space="1">
              <Text color={'gray.500'} fontSize={'sm'}>
                {exercice.reps} x
              </Text>
              <Text fontSize={'lg'}>{exercice.weigth} kg</Text>
            </HStack>
          </HStack>
        </VStack>
      ))}
      <HStack alignItems="center" justifyContent={'space-between'}>
        <Text color={'gray.500'} fontSize={'sm'}>
          {step.set_number} sets
        </Text>
        <Text color={'gray.500'} fontSize={'sm'}>
          {step.rest_time} min
        </Text>
      </HStack>
    </VStack>
  );
}
