import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, HStack, IconButton, Pressable, Text, VStack } from 'native-base';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramSessionStep } from '@/store/Programs';
import { UID_V4 } from '@/types/Exercices.types';

interface SessionStepSupersetProps {
  item: ProgramSessionStep;
  onOptions?: (id: UID_V4) => void;
  drag?: () => void;
}

export default function SessionStepSuperset({ item, onOptions, drag }: SessionStepSupersetProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);
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
              <Badge>Superset</Badge>
            </HStack>

            {item.exercices.map((exercice, index) => (
              <VStack flex="1" space="2" key={index}>
                <HStack alignItems="center" justifyContent={'space-between'} space="2">
                  <Text
                    fontSize={'lg'}
                    fontWeight="medium"
                    lineBreakMode="head"
                    numberOfLines={1}
                    flex="1"
                  >
                    {
                      exercices.find((exerciceItem) => exerciceItem.id === exercice.exerciceId)
                        ?.name
                    }
                  </Text>
                  <HStack alignItems="center" justifyContent={'space-between'} space="1">
                    <Text color={'gray.500'} fontSize={'md'}>
                      {exercice.reps} x
                    </Text>
                    <Text fontSize={'lg'}>{exercice.weight} kg</Text>
                  </HStack>
                </HStack>
              </VStack>
            ))}
            <HStack alignItems="center" justifyContent={'space-between'}>
              <Text color={'gray.500'} fontSize={'md'}>
                {item.setNumber} séries
              </Text>
              <Text color={'gray.500'} fontSize={'md'}>
                {item.restTime} min
              </Text>
            </HStack>
          </VStack>
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
      </Pressable>
    </ScaleDecorator>
  );
}
