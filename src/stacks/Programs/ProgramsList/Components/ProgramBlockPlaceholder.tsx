import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Icon, Pressable, Text, VStack } from 'native-base';

interface ProgramBlockPlaceholderProps {
  onPress: () => void;
}

export default function ProgramBlockPlaceholder({ onPress }: ProgramBlockPlaceholderProps) {
  return (
    <Pressable w="full" onPress={onPress}>
      <VStack space={4}>
        <Box
          rounded={8}
          p={4}
          backgroundColor="gray.200"
          borderColor={'gray.400'}
          borderStyle="dashed"
          borderWidth={2}
        >
          <VStack space={1}>
            <Text color={'gray.500'} fontSize="xl">
              Aucun programme pour le moment
            </Text>
            <Text color={'gray.500'}>
              Vos programmes apparaîtront ici. Créez-en un pour commencer.
            </Text>
          </VStack>
        </Box>
        <Button w="full" leftIcon={<Icon as={Ionicons} name="add" size="md" />} onPress={onPress}>
          Créer votre premier programme
        </Button>
      </VStack>
    </Pressable>
  );
}
