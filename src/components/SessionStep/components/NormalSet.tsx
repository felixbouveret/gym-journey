import { HStack, Text, VStack } from 'native-base';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { ProgramSessionStep } from '@/store/Programs';

interface NormalSetProps {
  item: ProgramSessionStep;
}

export default function NormalSet({ item }: NormalSetProps) {
  const { exercices } = useSelector((state: RootState) => state.exercices);
  const exercice = item.exercices[0];
  return (
    <VStack flex="1" space="2">
      <HStack alignItems="center" justifyContent={'space-between'} space="2">
        <Text fontSize={'lg'} fontWeight="medium" lineBreakMode="head" numberOfLines={1} flex="1">
          {exercices.find((exerciceItem) => exerciceItem.id === exercice.exerciceId)?.name}
        </Text>
        <Text fontSize={'lg'}>{exercice.weight} kg</Text>
      </HStack>
      <HStack space={8} justifyContent={'space-between'}>
        <HStack space={4} justifyContent={'space-between'}>
          <Text color={'gray.500'} fontSize={'sm'}>
            {item.setNumber} sets
          </Text>
          <Text color={'gray.500'} fontSize={'sm'}>
            {exercice.reps} reps
          </Text>
        </HStack>
        <Text color={'gray.500'} fontSize={'sm'}>
          {item.restTime} min
        </Text>
      </HStack>
    </VStack>
  );
}
