import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import { Exercice } from '@/types/Exercices.types';

import { UID_V4 } from './Programs';

type SliceState = { exercices: Exercice[] };

const initialState: SliceState = { exercices: [] };

export const roomsStore = createSlice({
  name: 'exercices',

  initialState,

  reducers: {
    setState: {
      reducer(state, action: PayloadAction<{ storageState: Exercice[] }>) {
        state.exercices = action.payload.storageState;
      },
      prepare(storageState: Exercice[]) {
        return { payload: { storageState } };
      }
    },

    createExercice: {
      reducer(
        state,
        action: PayloadAction<{ name: string; description?: string; isUnilateral: boolean }>
      ) {
        const exerciceId = uuid.v4();
        state.exercices.push({
          id: exerciceId,
          name: action.payload.name,
          description: action.payload.description,
          isUnilateral: action.payload.isUnilateral
        });
      },
      prepare(exercice: { name: string; description?: string; isUnilateral: boolean }) {
        return { payload: exercice };
      }
    },

    updateExercice: {
      reducer(
        state,
        action: PayloadAction<{
          id: UID_V4;
          exercice: Exercice;
        }>
      ) {
        const exerciceIndex = state.exercices.findIndex((e) => e.id === action.payload.id);
        if (exerciceIndex !== undefined && exerciceIndex !== -1)
          state.exercices[exerciceIndex] = action.payload.exercice;
      },
      prepare(id: UID_V4, exercice: Exercice) {
        return { payload: { id, exercice } };
      }
    },

    removeExercice: {
      reducer(
        state,
        action: PayloadAction<{
          id: UID_V4;
        }>
      ) {
        const exerciceIndex = state.exercices.findIndex((e) => e.id === action.payload.id);
        if (exerciceIndex !== undefined && exerciceIndex !== -1)
          state.exercices.splice(exerciceIndex, 1);
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    }
  }
});

export const { setState, createExercice, updateExercice, removeExercice } = roomsStore.actions;

export default roomsStore.reducer;
