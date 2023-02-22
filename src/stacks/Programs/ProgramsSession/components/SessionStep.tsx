import { Ionicons } from '@expo/vector-icons';
import { HStack, IconButton, Text, VStack } from 'native-base';

import { ProgramSessionStep } from '@/store/Programs';

interface SessionStepProps {
  step: ProgramSessionStep;
  onOptions?: (name: string) => void;
}

export default function SessionStep({ step, onOptions }: SessionStepProps) {
  return (
    <HStack p={4} pr="2" flex="1" space="2" backgroundColor={'white'} rounded={8}>
      <VStack flex="1" space="2">
        <HStack alignItems="center" justifyContent={'space-between'}>
          <Text fontSize={'xl'} fontWeight="medium">
            {step.name}
          </Text>
          <Text fontSize={'xl'}>{step.weight} kg</Text>
        </HStack>
        <HStack space={8} justifyContent={'space-between'}>
          <HStack space={4} justifyContent={'space-between'}>
            <Text color={'gray.500'} fontSize={'md'}>
              {step.setNumber} séries
            </Text>
            <Text color={'gray.500'} fontSize={'md'}>
              {step.reps} répétitions
            </Text>
          </HStack>
          <Text color={'gray.500'} fontSize={'md'}>
            {step.restTime} min
          </Text>
        </HStack>
      </VStack>
      <IconButton
        size="sm"
        p={1}
        onPress={() => onOptions?.(step.name)}
        _icon={{
          as: Ionicons,
          color: 'gray.700',
          name: 'ellipsis-vertical'
        }}
      />
    </HStack>
  );
}
