import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Pressable, Text, VStack } from 'native-base';
import { ScaleDecorator } from 'react-native-draggable-flatlist';

import { ProgramSessionStep } from '@/store/Programs';

interface SessionStepProps {
  item: ProgramSessionStep;
  onOptions?: (name: string) => void;
  drag?: () => void;
}

export default function SessionStep({ item, onOptions, drag }: SessionStepProps) {
  return (
    <ScaleDecorator>
      <Pressable onLongPress={drag} w="full" flex="1">
        <HStack
          space="4"
          p={4}
          px="2"
          flex="1"
          backgroundColor={'white'}
          rounded={8}
          w="full"
          alignItems={'center'}
        >
          <Box w={1} h="100%" backgroundColor={'gray.100'} rounded="full" />
          <VStack flex="1" space="2">
            <HStack alignItems="center" justifyContent={'space-between'}>
              <Text fontSize={'xl'} fontWeight="medium">
                {item.name}
              </Text>
              <Text fontSize={'xl'}>{item.weight} kg</Text>
            </HStack>
            <HStack space={8} justifyContent={'space-between'}>
              <HStack space={4} justifyContent={'space-between'}>
                <Text color={'gray.500'} fontSize={'md'}>
                  {item.setNumber} séries
                </Text>
                <Text color={'gray.500'} fontSize={'md'}>
                  {item.reps} répétitions
                </Text>
              </HStack>
              <Text color={'gray.500'} fontSize={'md'}>
                {item.restTime} min
              </Text>
            </HStack>
          </VStack>
          <IconButton
            size="sm"
            p={1}
            onPress={() => onOptions?.(item.name)}
            _icon={{
              as: Ionicons,
              color: 'gray.700',
              name: 'ellipsis-vertical'
            }}
          />
        </HStack>
      </Pressable>
    </ScaleDecorator>
  );
}
