import { VStack } from 'native-base';

import InfoBlock from '@/components/InfoBlock';
import { RootTabScreenProps } from '@/types';

export default function HistoryScreen({}: RootTabScreenProps<'History'>) {
  return (
    <VStack w="full" h="full" p={4} justifyContent="center">
      <InfoBlock title="HistoryScreen in progress..." />
    </VStack>
  );
}
