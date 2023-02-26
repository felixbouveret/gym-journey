import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';

import { createExercice } from '@/store/Exercices';
import { Exercice } from '@/types/Exercices.types';

export default function useExercices() {
  const dispatch = useDispatch();

  const onCreateExercice = async (exercice: Omit<Exercice, 'id'>) => {
    const id = uuid.v4();

    dispatch(createExercice({ id, ...exercice }));
    return id;
  };

  return {
    onCreateExercice
  };
}
