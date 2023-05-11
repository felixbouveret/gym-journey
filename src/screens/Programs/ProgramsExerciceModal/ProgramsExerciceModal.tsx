import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Box, Button, Heading, Icon, KeyboardAvoidingView, ScrollView, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { createSessionStepAndExercice } from '@/api/BackPackAPI';
import { StepWithNewExercicePayload } from '@/api/types';
import SelectBoxes from '@/components/SelectBoxes';
import { ProgramsTabScreenProps } from '@/navigation/navigators/ProgramsNavigator';
import { ExerciceType } from '@/types/Exercices.types';

import NormalSet from './components/NormalSet';
import SuperSet from './components/Superset';

export default function ProgramsExerciceModal({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsExerciceModal'>) {
  const sessionId = route.params.sessionId;
  const step = route.params.step;

  const [type, setType] = useState(ExerciceType.NORMAL);
  const [isEditing, setIsEditing] = useState(false);
  const [stepExercices, setStepExercices] = useState([
    {
      name: '',
      description: 'none',
      weight: '',
      reps: ''
    }
  ]);
  const [sets, setSets] = useState('');
  const [restTime, setRestTime] = useState('');

  useEffect(() => {
    if (step) {
      setIsEditing(true);
    }
  }, []);

  const submitSet = async () => {
    if (stepExercices.length <= 0) return;
    // TODO : check for api payload
    const payload: StepWithNewExercicePayload = {
      program_session_id: sessionId,
      step_type: type,
      set_number: parseInt(sets, 10),
      rest_time: parseInt(restTime, 10),
      exercices: stepExercices
    };
    await createSessionStepAndExercice(payload);
  };

  const submit = async () => {
    await submitSet();
    navigation.goBack();
  };

  const isValid = () => {
    if (type === ExerciceType.NORMAL)
      return Object.entries(stepExercices[0]).every(([k, value]) => !!value);

    return true;
  };

  const updateExercice = (index: number, e: any) => {
    const newExercices = [...stepExercices];
    newExercices[index] = e;
    setStepExercices(newExercices);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={46}
    >
      <VStack w="full" h="full" pb={46} space={8} alignItems="center" backgroundColor={'white'}>
        <ScrollView w={'full'} overflow="visible">
          <VStack w="full" p="4" space={4} alignItems="center" pt={2}>
            <VStack w="full" space={2} alignItems="center" maxW={250}>
              <Icon as={Ionicons} name="barbell" size={'4xl'} color="gray.700" />
              <Heading textAlign={'center'}>
                {isEditing ? "Modifier l'" : 'Ajouter un nouvel '}exercice
              </Heading>
            </VStack>
            <VStack w="full" space={4}>
              <SelectBoxes
                label="Type d'exercice"
                selectedValue={type}
                onChange={(e) => setType(e)}
                options={[
                  {
                    wording: 'Normal',
                    value: ExerciceType.NORMAL
                  },
                  {
                    wording: 'Superset',
                    value: ExerciceType.SUPERSET
                  }
                ]}
              />
              {type === ExerciceType.NORMAL ? (
                <NormalSet
                  data={stepExercices}
                  sets={sets}
                  restTime={restTime}
                  onDataChange={updateExercice}
                  onSetsChange={(e) => setSets(e)}
                  onRestTimeChange={(e) => setRestTime(e)}
                />
              ) : (
                <SuperSet
                  data={stepExercices}
                  sets={sets}
                  restTime={restTime}
                  onDataChange={updateExercice}
                  onSetsChange={(e) => setSets(e)}
                  onRestTimeChange={(e) => setRestTime(e)}
                />
              )}
            </VStack>
          </VStack>
        </ScrollView>
        <Box px={4} w="full">
          <Button
            w="full"
            leftIcon={<Icon as={Ionicons} name={isEditing ? 'pencil' : 'add'} size="md" />}
            onPress={submit}
            isDisabled={!isValid()}
          >
            {isEditing ? 'Modifier' : 'Ajouter'}
          </Button>
        </Box>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </VStack>
    </KeyboardAvoidingView>
  );
}
