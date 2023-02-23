import { StatusBar } from 'expo-status-bar';
import { Button, Checkbox, FormControl, Input, TextArea, View, VStack } from 'native-base';
import { useState } from 'react';
import { Platform } from 'react-native';

import useStorage from '@/hooks/useStorage';

export default function ExerciceModalScreen() {
  //state for each input
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isUnilateral, setIsUnilateral] = useState(false);

  const { setStorageData, getStorageData } = useStorage();

  const handleSubmit = async () => {
    const exercice = ((await getStorageData('exercices')) as []) || [];
    await setStorageData('exercices', [{ name, description, isUnilateral }, ...exercice]);
  };

  return (
    <View>
      <VStack p={4} pb={8} justifyContent="space-between" h="full">
        <VStack space={4}>
          <FormControl>
            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Nom de l'exercice
            </FormControl.Label>
            <Input value={name} onChangeText={setName} />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Description de l'exercice
            </FormControl.Label>
            <TextArea
              value={description}
              h={20}
              w="100%"
              autoCompleteType={'none'}
              onChangeText={setDescription}
            />
          </FormControl>
          <Checkbox value="isUnilateral" isChecked={isUnilateral} onChange={setIsUnilateral}>
            Exercice unilatéral
          </Checkbox>
        </VStack>
        <Button onPress={handleSubmit}>Ajouter</Button>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
      </VStack>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
