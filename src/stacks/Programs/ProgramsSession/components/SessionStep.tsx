import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Text, VStack } from 'native-base';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramSessionStep } from '@/store/Programs';
import { UID_V4 } from '@/types/Exercices.types';

interface SessionStepProps {
  item: ProgramSessionStep;
  onOptions?: (id: UID_V4) => void;
  isDraggable?: boolean;
}

export default function SessionStep({ item, onOptions, isDraggable }: SessionStepProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);
  return (
    <HStack
      space="4"
      p={4}
      px={2}
      pl={isDraggable ? 2 : 4}
      flex="1"
      backgroundColor={'white'}
      rounded={8}
      w="full"
      alignItems={'center'}
    >
      {isDraggable && <Box w={1} h="100%" backgroundColor={'gray.100'} rounded="full" />}
      {item.exercices.map((exercice, index) => (
        <VStack flex="1" space="2" key={index}>
          <HStack alignItems="center" justifyContent={'space-between'} space="2">
            <Text
              fontSize={'xl'}
              fontWeight="medium"
              lineBreakMode="head"
              numberOfLines={1}
              flex="1"
            >
              {exercices.find((exerciceItem) => exerciceItem.id === exercice.exerciceId)?.name}
            </Text>
            <Text fontSize={'xl'}>{exercice.weight} kg</Text>
          </HStack>
          <HStack space={8} justifyContent={'space-between'}>
            <HStack space={4} justifyContent={'space-between'}>
              <Text color={'gray.500'} fontSize={'md'}>
                {item.setNumber} séries
              </Text>
              <Text color={'gray.500'} fontSize={'md'}>
                {exercice.reps} répétitions
              </Text>
            </HStack>
            <Text color={'gray.500'} fontSize={'md'}>
              {item.restTime} min
            </Text>
          </HStack>
        </VStack>
      ))}
      <IconButton
        size="sm"
        p={1}
        onPress={() => onOptions?.(item.id)}
        _icon={{
          as: Ionicons,
          color: 'gray.700',
          name: 'ellipsis-vertical'
        }}
      />
    </HStack>
  );
}
