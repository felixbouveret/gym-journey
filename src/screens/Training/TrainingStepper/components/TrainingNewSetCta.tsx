import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, IconButton, Pressable } from 'native-base';

interface TrainingNewSetCtaProps {
  onPress: () => void;
}

export default function TrainingNewSetCta({ onPress }: TrainingNewSetCtaProps) {
  return (
    <Pressable variant="outline" w={'full'} onPress={onPress} mt={2} mb={20}>
      <HStack space={2} w={'full'} h={8}>
        <Box w={'24px'} h={'full'} backgroundColor={'gray.50'} rounded={8} />
        <Box
          h={'full'}
          flex={1}
          backgroundColor={'gray.100'}
          rounded={8}
          borderWidth={1}
          borderColor={'gray.300'}
        />
        <Box
          h={'full'}
          flex={1}
          backgroundColor={'gray.100'}
          rounded={8}
          borderWidth={1}
          borderColor={'gray.300'}
        />
        <IconButton
          size="xs"
          w={'24px'}
          variant={'subtle'}
          onPress={onPress}
          _icon={{
            as: Ionicons,
            name: 'add'
          }}
        />
      </HStack>
    </Pressable>
  );
}
