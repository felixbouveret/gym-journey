import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { useDispatch } from 'react-redux';

import { setActiveTraining, Training } from '@/store/Training';

type CurrentTrainingCardProps = {
  ongoingTraining: Training;
  onPress: () => void;
};

export default function CurrentTrainingCard({
  ongoingTraining,
  onPress
}: CurrentTrainingCardProps) {
  const dispatch = useDispatch();

  return (
    <Pressable
      w="full"
      p={4}
      backgroundColor="white"
      borderRadius="8"
      shadow={4}
      onPress={() => {
        dispatch(setActiveTraining(ongoingTraining.id));
        onPress();
      }}
    >
      <HStack alignItems={'center'} justifyContent="space-between">
        <VStack alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Reprendre l'entrainement
          </Text>
          <Text fontSize="sm" color="gray.500">
            {ongoingTraining.sessionName}
          </Text>
        </VStack>
        <Icon size="sm" as={Ionicons} flexShrink={0} color="gray.700" name="chevron-forward" />
      </HStack>
    </Pressable>
  );
}
