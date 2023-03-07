import { Badge, HStack, Text, VStack } from 'native-base';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramSessionStep } from '@/store/Programs';

interface SuperSetProps {
  item: ProgramSessionStep;
}

export default function SuperSet({ item }: SuperSetProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);
  return (
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
              {exercices.find((exerciceItem) => exerciceItem.id === exercice.exerciceId)?.name}
            </Text>
            <HStack alignItems="center" justifyContent={'space-between'} space="1">
              <Text color={'gray.500'} fontSize={'sm'}>
                {exercice.reps} x
              </Text>
              <Text fontSize={'lg'}>{exercice.weight} kg</Text>
            </HStack>
          </HStack>
        </VStack>
      ))}
      <HStack alignItems="center" justifyContent={'space-between'}>
        <Text color={'gray.500'} fontSize={'sm'}>
          {item.setNumber} séries
        </Text>
        <Text color={'gray.500'} fontSize={'sm'}>
          {item.restTime} min
        </Text>
      </HStack>
    </VStack>
  );
}
