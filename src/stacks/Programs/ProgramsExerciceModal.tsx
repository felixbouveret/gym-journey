import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Button, FormControl, Icon, Input, VStack } from 'native-base';
import { Platform } from 'react-native';

import { ProgramsTabScreenProps } from '@/types';

export default function ProgramsExerciceModal({}: ProgramsTabScreenProps<'ProgramsExerciceModal'>) {
  return (
    <VStack w="full" h={'full'} p="4" pb={46}>
      <VStack flex={1} w="full" space="4">
        <FormControl>
          <Input />
        </FormControl>
      </VStack>

      <Button w="full" leftIcon={<Icon as={Ionicons} name="add" size="md" />} onPress={() => null}>
        Ajouter une séance
      </Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </VStack>
  );
}
