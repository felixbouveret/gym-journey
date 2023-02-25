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

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { onCreateExercice } = useExercices();

  const [type, setType] = useState(ExerciceType.NORMAL);
  const [normalSet, setNormalSet] = useState({
    name: '',
    isUnilateral: false,
    weight: '',
    reps: '',
    sets: '',
    restTime: ''
  });

  useEffect(() => {
    if (stepId) {
      const program = programs.find((p) => p.id === programId);
      const session = program?.sessions.find((s) => s.id === sessionId);
      const step = session?.steps.find((s) => s.id === stepId);

      if (step) {
        if (step.type === ExerciceType.NORMAL) {
          const globalExercice = exercices.find((e) => e.id === step.exercices[0].exerciceId);
          setNormalSet({
            name: globalExercice?.name || '',
            isUnilateral: globalExercice?.isUnilateral || false,
            weight: step.exercices[0].weight,
            reps: step.exercices[0].reps,
            sets: step.setNumber,
            restTime: step.restTime
          });
        }
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

  const submitNormalSet = async () => {
    let exerciceId: UID_V4;

    const globalExercice = exercices.find((e) => e.name === normalSet.name);

    if (globalExercice) exerciceId = globalExercice.id;
    else
      exerciceId = await onCreateExercice({
        name: normalSet.name,
        isUnilateral: normalSet.isUnilateral
      });

    const sessionStep = {
      type: ExerciceType.NORMAL,
      setNumber: normalSet.sets,
      restTime: normalSet.restTime,
      exercices: [
        {
          weight: normalSet.weight,
          reps: normalSet.reps,
          exerciceId: exerciceId
        }
      ]
    };

    if (!stepId) dispatch(addSessionStep(programId, sessionId, sessionStep));
    else dispatch(updateSessionStep(programId, sessionId, stepId, sessionStep));
  };

  const submit = async () => {
    if (type === ExerciceType.NORMAL) await submitNormalSet();
    navigation.goBack();
  };

  const isValid = () => {
    if (type === ExerciceType.NORMAL) {
      return Object.entries(normalSet).every(([k, value]) =>
        k === 'isUnilateral' ? true : !!value
      );
    }
    return false;
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
              <VStack w="full">
                <SelectBoxes
                  label="Type d'exercice"
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
              </VStack>
              {type === ExerciceType.NORMAL ? (
                <NormalSet data={normalSet} onChange={(e) => setNormalSet(e)} />
              ) : null}
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
