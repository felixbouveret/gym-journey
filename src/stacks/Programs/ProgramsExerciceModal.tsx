import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  VStack
} from 'native-base';
import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useSelector } from 'react-redux';

import useSessions from '@/hooks/useSessions';
import useStorage from '@/hooks/useStorage';
import { RootState } from '@/store';
import { ProgramSessionStep } from '@/store/Programs';
import { ProgramsTabScreenProps } from '@/types';

export default function ProgramsExerciceModal({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsExerciceModal'>) {
  const { programs } = useSelector((state: RootState) => state.programs);
  const { setStorageData, getStorageData } = useStorage();
  const { onAddSessionStep, onUpdateSessionStep } = useSessions();

  const [isUnilateral, setIsUnilateral] = useState(false);
  const [formData, setFormData] = useState<Partial<ProgramSessionStep>>({
    name: '',
    setNumber: '',
    weight: '',
    restTime: '',
    reps: ''
  });

  useEffect(() => {
    if (route.params.exerciceName) {
      const currentProgram = programs.find((program) => program.id === route.params.programId);
      const currentSession = currentProgram?.sessions.find(
        (session) => session.id === route.params.sessionId
      );
      const currentStep = currentSession?.steps.find(
        (step) => step.name === route.params.exerciceName
      );
      if (currentStep) {
        const { isUnilateral: currentStepIsUni, ...currentStepFormData } = currentStep;
        setFormData({ ...currentStepFormData });
        setIsUnilateral(currentStepIsUni);
      }
    }
  }, []);

  const setSingleFormData = (key: string, value: string | boolean) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleExerciceDatabase = async () => {
    const exercice = ((await getStorageData('exercices')) as []) || [];
    if (!exercice.find((e: any) => e.name === formData.name))
      await setStorageData('exercices', [{ name: formData.name, isUnilateral }, ...exercice]);
  };

  const handleSubmit = async () => {
    await handleExerciceDatabase();

    const step = { ...formData, isUnilateral } as ProgramSessionStep;
    onAddSessionStep({
      programId: route.params.programId,
      sessionId: route.params.sessionId,
      step
    });
    navigation.goBack();
  };

  const handleUpdate = async () => {
    if (!route.params.exerciceName) return;
    await handleExerciceDatabase();

    const step = { ...formData, isUnilateral } as ProgramSessionStep;
    onUpdateSessionStep({
      programId: route.params.programId,
      sessionId: route.params.sessionId,
      stepName: route.params.exerciceName,
      step
    });
    navigation.goBack();
  };

  const submitButton = () => {
    if (route.params.exerciceName)
      return (
        <Button
          w="full"
          leftIcon={<Icon as={Ionicons} name="pencil" size="md" />}
          onPress={() => handleUpdate()}
          isDisabled={!Object.values(formData).every((e) => e)}
        >
          Modifier
        </Button>
      );
    return (
      <Button
        w="full"
        leftIcon={<Icon as={Ionicons} name="add" size="md" />}
        onPress={() => handleSubmit()}
        isDisabled={!Object.values(formData).every((e) => e)}
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
        <VStack
          w="full"
          h={'full'}
          p="4"
          pb={46}
          backgroundColor="white"
          space={8}
          alignItems="center"
        >
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
            <HStack space={4}>
              <FormControl flex={1}>
                <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                  Séries
                </FormControl.Label>
                <Input
                  size={'xl'}
                  value={formData.setNumber}
                  keyboardType="decimal-pad"
                  onChangeText={(e) => setSingleFormData('setNumber', e)}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                  Répétitions
                </FormControl.Label>
                <Input
                  size={'xl'}
                  value={formData.reps}
                  keyboardType="decimal-pad"
                  onChangeText={(e) => setSingleFormData('reps', e)}
                />
              </FormControl>
            </HStack>
            <HStack space={4}>
              <FormControl flex={1}>
                <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                  Charge (kg)
                </FormControl.Label>
                <Input
                  size={'xl'}
                  value={formData.weight}
                  keyboardType="decimal-pad"
                  onChangeText={(e) => setSingleFormData('weight', e)}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormControl.Label _text={{ color: 'gray.700', fontSize: 'sm', fontWeight: 600 }}>
                  Repos (m)
                </FormControl.Label>
                <Input
                  size={'xl'}
                  value={formData.restTime}
                  keyboardType="decimal-pad"
                  onChangeText={(e) => setSingleFormData('restTime', e)}
                />
              </FormControl>
            </HStack>
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

          {submitButton()}

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </VStack>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
