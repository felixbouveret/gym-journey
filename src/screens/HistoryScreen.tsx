import { Text, VStack } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { RootTabScreenProps } from '@/types';

export default function HistoryScreen({}: RootTabScreenProps<'History'>) {
  const { trainings } = useSelector((state: RootState) => state.training);

  return (
    <VStack w="full" h="full" p={4} justifyContent="center">
      <Text>{trainings.length}</Text>
      <FlatList data={trainings} renderItem={({ item }) => <Text>{item.sessionName}</Text>} />
    </VStack>
  );
}
