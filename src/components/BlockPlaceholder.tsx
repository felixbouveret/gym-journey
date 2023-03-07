import { Ionicons } from '@expo/vector-icons';
import { Button, Icon, Pressable, VStack } from 'native-base';

import InfoBlock from './InfoBlock';

interface BlockPlaceholderProps {
  onPress: () => void;
  title: string;
  description: string;
  cta: string;
}

export default function BlockPlaceholder({
  onPress,
  title,
  description,
  cta
}: BlockPlaceholderProps) {
  return (
    <Pressable w="full" onPress={onPress}>
      <VStack space={4}>
        <InfoBlock title={title} description={description} />
        <Button w="full" leftIcon={<Icon as={Ionicons} name="add" size="md" />} onPress={onPress}>
          {cta}
        </Button>
      </VStack>
    </Pressable>
  );
}
