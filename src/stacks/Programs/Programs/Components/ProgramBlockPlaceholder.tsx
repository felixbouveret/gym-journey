import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, Icon, Pressable, Text } from 'native-base';

interface ProgramBlockPlaceholderProps {
  onPress: () => void;
}

export default function ProgramBlockPlaceholder({ onPress }: ProgramBlockPlaceholderProps) {
  return (
    <Pressable w="full" onPress={onPress}>
      <Box w="full" backgroundColor="gray.200" rounded={4} overflow="hidden">
        <Box p={2} backgroundColor="gray.400">
          <Text fontSize={'lg'}>Aucun programme créé</Text>
        </Box>
        <Box p={2}>
          <Button
            variant={'outline'}
            leftIcon={<Icon as={MaterialIcons} name="add" size="md" />}
            onPress={onPress}
          >
            Créer votre premier programme
          </Button>
        </Box>
      </Box>
    </Pressable>
  );
}
