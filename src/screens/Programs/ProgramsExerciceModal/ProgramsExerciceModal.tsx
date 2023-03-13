import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  Box,
  Button,
  Heading,
  Icon,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  VStack
} from 'native-base';
import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SelectBoxes from '@/components/SelectBoxes';
import useExercices from '@/hooks/useExercices';
import { RootState } from '@/store';
import { addSessionStep, updateSessionStep } from '@/store/Programs';
import { ProgramsTabScreenProps } from '@/types';
import { ExerciceType, UID_V4 } from '@/types/Exercices.types';

import NormalSet from './components/NormalSet';
import SuperSet from './components/Superset';

export default function ProgramsExerciceModal({
  navigation,
  route
}: ProgramsTabScreenProps<'ProgramsExerciceModal'>) {
  const dispatch = useDispatch();

  const { exercices } = useSelector((state: RootState) => state.exercices);
  const { programs } = useSelector((state: RootState) => state.programs);

  const programId = route.params.programId;
  const sessionId = route.params.sessionId;
  const stepId = route.params.stepId;

  const { onCreateExercice } = useExercices();

  const [type, setType] = useState(ExerciceType.NORMAL);
  const [stepExercices, setStepExercices] = useState([
    {
      name: '',
      weight: '',
      reps: '',
      isUnilateral: false
    }
  ]);
  const [sets, setSets] = useState('');
  const [restTime, setRestTime] = useState('');

  useEffect(() => {
    if (stepId) {
      const program = programs.find((p) => p.id === programId);
      const session = program?.sessions.find((s) => s.id === sessionId);
      const step = session?.steps.find((s) => s.id === stepId);

      if (step) {
        setType(step.type);
        setSets(step.setNumber);
        setRestTime(step.restTime);
        const formattedExercices = step.exercices.map((stepExercice) => {
          const globalExercice = exercices.find((e) => e.id === stepExercice.exerciceId);
          return {
            name: globalExercice?.name || '',
            isUnilateral: globalExercice?.isUnilateral || false,
            weight: stepExercice.weight,
            reps: stepExercice.reps
          };
        });
        setStepExercices(formattedExercices);
      }
    }
  }, []);

  const submitNormalSet = async () => {
    if (stepExercices.length <= 0) return;
    const stepExercicesFormatted = await Promise.all(
      stepExercices.map(async (e, index) => {
        if (type === ExerciceType.NORMAL && index > 0) return;
        let exerciceId: UID_V4;
        const globalExercice = exercices.find((ex) => ex.name === e.name);
        if (!globalExercice) {
          exerciceId = await onCreateExercice({
            name: e.name,
            isUnilateral: e.isUnilateral
          });
        } else exerciceId = globalExercice.id;

        return {
          exerciceId: exerciceId,
          weight: e.weight,
          reps: e.reps
        };
      })
    );

    const sessionStep = {
      type,
      setNumber: sets,
      restTime: restTime,
      exercices: stepExercicesFormatted || []
    };

    if (!stepId) dispatch(addSessionStep(programId, sessionId, sessionStep));
    else dispatch(updateSessionStep(programId, sessionId, stepId, sessionStep));
  };

  const submit = async () => {
    await submitNormalSet();
    navigation.goBack();
  };

  const isValid = () => {
    if (type === ExerciceType.NORMAL) {
      return Object.entries(stepExercices[0]).every(([k, value]) =>
        k === 'isUnilateral' ? true : !!value
      );
    }
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
      <Pressable onPress={Keyboard.dismiss}>
        <VStack w="full" h="full" pb={46} space={8} alignItems="center" backgroundColor={'white'}>
          <ScrollView w={'full'} overflow="visible">
            <VStack w="full" p="4" space={8} alignItems="center">
              <VStack w="full" space={2} alignItems="center" maxW={200}>
                <Icon as={Ionicons} name="barbell" size={'4xl'} color="gray.700" />
                <Heading textAlign={'center'}>Ajouter un nouvel exercice</Heading>
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
              leftIcon={<Icon as={Ionicons} name={stepId ? 'pencil' : 'add'} size="md" />}
              onPress={submit}
              isDisabled={!isValid()}
            >
              {stepId ? 'Modifier' : 'Ajouter'}
            </Button>
          </Box>

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </VStack>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
