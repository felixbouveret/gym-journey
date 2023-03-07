import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextArea,
  VStack
} from 'native-base';
import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import useExercices from '@/hooks/useExercices';
import { RootState } from '@/store';
import { updateExercice } from '@/store/Exercices';
import { ExercicesTabScreenProps } from '@/types';
import { Exercice } from '@/types/Exercices.types';

export default function ExerciceModalScreen({
  navigation,
  route
}: ExercicesTabScreenProps<'ExerciceModal'>) {
  const dispatch = useDispatch();

  const { exercices } = useSelector((state: RootState) => state.exercices);

  const { onCreateExercice } = useExercices();

  const [isUnilateral, setIsUnilateral] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [formData, setFormData] = useState<Partial<Exercice>>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (route.params.id) {
      const currentExercice = exercices.find((exercice) => exercice.id === route.params.id);
      if (currentExercice) {
        const { isUnilateral: currentExerciceIsUni, ...currentExerciceFormData } = currentExercice;
        setFormData({ ...currentExerciceFormData });
        setIsUnilateral(currentExerciceIsUni);
      }
    }
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const setSingleFormData = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    const exercice = { ...formData, isUnilateral } as Exercice;
    onCreateExercice(exercice);
    navigation.goBack();
  };

  const handleUpdate = async () => {
    if (!route.params.id) return;
    const exercice = { ...formData, isUnilateral } as Exercice;
    dispatch(updateExercice(route.params.id, exercice));

    navigation.goBack();
  };

  const isValid = () => {
    return [formData.name].every((e) => e);
  };

  const submitButton = () => {
    if (route.params.id)
      return (
        <Button
          w="full"
          leftIcon={<Icon as={Ionicons} name="pencil" size="md" />}
          onPress={() => handleUpdate()}
          isDisabled={!isValid()}
        >
          Modifier
        </Button>
      );
    return (
      <Button
        w="full"
        leftIcon={<Icon as={Ionicons} name="add" size="md" />}
        onPress={() => handleSubmit()}
        isDisabled={!isValid()}
      >
        Ajouter
      </Button>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={46}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <VStack w="full" h="full" pb={46} space={8} alignItems="center" backgroundColor={'white'}>
          <ScrollView w={'full'} scrollEnabled={isKeyboardVisible} overflow="visible">
            <VStack w="full" p="4" space={8} alignItems="center">
              <VStack w="full" space={2} alignItems="center" maxW={200}>
                <Icon as={Ionicons} name="barbell" size={'4xl'} color="gray.700" />
                <Heading textAlign={'center'}>Ajouter un nouvel exercice</Heading>
              </VStack>
              <VStack flex={1} w="full" space="4">
                <FormControl>
                  <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                    Nom de l'exercice
                  </FormControl.Label>
                  <Input
                    size={'xl'}
                    value={formData.name}
                    onChangeText={(e) => setSingleFormData('name', e)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                    Description
                  </FormControl.Label>
                  <TextArea
                    size={'xl'}
                    autoCompleteType="off"
                    h={'200px'}
                    value={formData.description}
                    onChangeText={(e) => setSingleFormData('description', e)}
                  />
                </FormControl>
                <Checkbox
                  value="isUnilateral"
                  isChecked={isUnilateral}
                  onChange={(e) => {
                    setIsUnilateral(e);
                  }}
                >
                  Exercice unilatéral
                </Checkbox>
              </VStack>
            </VStack>
          </ScrollView>
          <Box px={4} w="full">
            {submitButton()}
          </Box>

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </VStack>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
