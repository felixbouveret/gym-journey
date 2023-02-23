import { Ionicons } from '@expo/vector-icons';
import { Button, Icon, Pressable, Text, VStack } from 'native-base';

interface ProgramBlockPlaceholderProps {
  onPress: () => void;
}

export default function ProgramBlockPlaceholder({ onPress }: ProgramBlockPlaceholderProps) {
  return (
    <Pressable w="full">
      <VStack
        w="full"
        backgroundColor="gray.50"
        rounded={8}
        overflow="hidden"
        p={4}
        space="4"
        alignItems={'center'}
      >
        <Text fontSize={'lg'} color="gray.400" fontWeight={'medium'}>
          Aucun programme pour le moment
        </Text>
        <Button
          variant={'outline'}
          w="full"
          leftIcon={<Icon as={Ionicons} name="add" size="md" />}
          onPress={onPress}
        >
          Créer votre premier programme
        </Button>
      </VStack>
    </Pressable>
  );
}
