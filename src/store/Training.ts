import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProgramSessionStep, UID_V4 } from './Programs';

type lift = {
  weight: string;
  reps: string;
};
export interface TrainingExercice {
  exerciceId: UID_V4;
  lifts: [lift, lift | undefined];
}
export interface TrainingSet {
  exercices: TrainingExercice[];
}

export interface TrainingStep {
  id: UID_V4;
  sessionStep: ProgramSessionStep;
  sets: TrainingSet[];
}

export interface Training {
  id: UID_V4;
  programId: UID_V4;
  sessionId: UID_V4;
  startedAt: Date;
  steps: TrainingStep[];
}

type SliceState = { training: Training | null };

const initialState: SliceState = { training: null };

export const roomsStore = createSlice({
  name: 'training',

  initialState,

  reducers: {
    setState: {
      reducer(state, action: PayloadAction<{ storageState: Training }>) {
        state.training = action.payload.storageState;
      },
      prepare(storageState: Training) {
        return { payload: { storageState } };
      }
    },
    initTraining: {
      reducer(
        state,
        action: PayloadAction<{
          trainingId: UID_V4;
          programId: UID_V4;
          sessionId: UID_V4;
          steps: TrainingStep[];
        }>
      ) {
        state.training = {
          id: action.payload.trainingId,
          programId: action.payload.programId,
          sessionId: action.payload.sessionId,
          startedAt: new Date(),
          steps: action.payload.steps
        };
      },
      prepare(trainingId: UID_V4, programId: UID_V4, sessionId: UID_V4, steps: TrainingStep[]) {
        return { payload: { trainingId, programId, sessionId, steps } };
      }
    }
  }
});

export const { setState } = roomsStore.actions;

export default roomsStore.reducer;
