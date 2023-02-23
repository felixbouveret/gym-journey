import { Text, VStack } from 'native-base';

import { RootStackScreenProps } from '@/types';

export default function TrainingScreen({}: RootStackScreenProps<'Training'>) {
  return (
    <VStack h={'full'} w="full" justifyContent={'center'} alignItems="center">
      <Text>Entrainement</Text>
    </VStack>
  );
}
