import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProgramSessionStep, UID_V4 } from './Programs';

export enum TrainingStateEnum {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED'
}

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
  sessionName: string;
  startedAt: string | null;
  state: TrainingStateEnum;
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
      reducer(state, action: PayloadAction<Training>) {
        state.training = action.payload;
      },
      prepare(training: Training) {
        return { payload: training };
      }
    }
  }
});

export const { setState, initTraining } = roomsStore.actions;

export default roomsStore.reducer;
