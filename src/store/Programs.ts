import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

import { ExerciceType } from '@/types/Exercices.types';

export enum ProgramStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DRAFT = 'draft'
}
export type UID_V4 = string | number[];
export interface StepExercice {
  exerciceId: UID_V4;
  weight: string;
  reps: string;
}
export interface ProgramSessionStep {
  id: UID_V4;
  exercices: StepExercice[];
  setNumber: string;
  restTime: string;
  type: ExerciceType;
}
export interface ProgramSession {
  id: UID_V4;
  name: string;
  steps: ProgramSessionStep[];
}
export interface Program {
  id: UID_V4;
  name: string;
  status: ProgramStatus;
  sessions: ProgramSession[];
}

type SliceState = { programs: Program[] };

const initialState: SliceState = { programs: [] };

export const roomsStore = createSlice({
  name: 'programs',

  initialState,

  reducers: {
    setState: {
      reducer(state, action: PayloadAction<{ storageState: Program[] }>) {
        state.programs = action.payload.storageState;
      },
      prepare(storageState: Program[]) {
        return { payload: { storageState } };
      }
    },

    createProgram: {
      reducer(state, action: PayloadAction<{ name: string; id: UID_V4 }>) {
        state.programs.push({
          id: action.payload.id,
          name: action.payload.name,
          sessions: [],
          status: ProgramStatus.DRAFT
        });
      },
      prepare(name: string, id: UID_V4) {
        return { payload: { name, id } };
      }
    },

    validateProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        const program = state.programs.find((p) => p.id === action.payload.id);
        if (program) program.status = ProgramStatus.ACTIVE;
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    archiveProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        const program = state.programs.find((p) => p.id === action.payload.id);
        if (program) program.status = ProgramStatus.ARCHIVED;
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    restoreProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        const program = state.programs.find((p) => p.id === action.payload.id);
        if (program) program.status = ProgramStatus.DRAFT;
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    deleteProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        state.programs = state.programs.filter((program) => program.id !== action.payload.id);
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    renameProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4; newName: string }>) {
        const program = state.programs.find((p) => p.id === action.payload.id);
        if (program) program.name = action.payload.newName;
      },
      prepare(id: UID_V4, newName: string) {
        return { payload: { id, newName } };
      }
    },

    createSession: {
      reducer(
        state,
        action: PayloadAction<{ programId: UID_V4; sessionId: UID_V4; name: string }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        if (program) {
          program.sessions.push({
            id: action.payload.sessionId,
            name: action.payload.name,
            steps: []
          });
        }
      },
      prepare(programId: UID_V4, sessionId: UID_V4, name: string) {
        return { payload: { programId, name, sessionId } };
      }
    },

    deleteSession: {
      reducer(state, action: PayloadAction<{ programId: UID_V4; sessionId: UID_V4 }>) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        if (program)
          program.sessions = program.sessions.filter((s) => s.id !== action.payload.sessionId);
      },
      prepare(programId: UID_V4, sessionId: UID_V4) {
        return { payload: { programId, sessionId } };
      }
    },

    renameSession: {
      reducer(
        state,
        action: PayloadAction<{ programId: UID_V4; sessionId: UID_V4; newName: string }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        if (session) session.name = action.payload.newName;
      },
      prepare(programId: UID_V4, sessionId: UID_V4, newName: string) {
        return { payload: { programId, sessionId, newName } };
      }
    },

    setSessions: {
      reducer(
        state,
        action: PayloadAction<{
          programId: UID_V4;
          sessions: ProgramSession[];
        }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        if (program) program.sessions = action.payload.sessions;
      },
      prepare(programId: UID_V4, sessions: ProgramSession[]) {
        return { payload: { programId, sessions } };
      }
    },

    addSessionStep: {
      reducer(
        state,
        action: PayloadAction<{
          programId: UID_V4;
          sessionId: UID_V4;
          step: Omit<ProgramSessionStep, 'id'>;
        }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        const stepId = uuid.v4();
        if (session) session.steps.push({ id: stepId, ...action.payload.step });
      },
      prepare(programId: UID_V4, sessionId: UID_V4, step: Omit<ProgramSessionStep, 'id'>) {
        return { payload: { programId, sessionId, step } };
      }
    },

    updateSessionStep: {
      reducer(
        state,
        action: PayloadAction<{
          programId: UID_V4;
          sessionId: UID_V4;
          stepId: UID_V4;
          step: Omit<ProgramSessionStep, 'id'>;
        }>
      ) {
        //update a session step
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        const stepIndex = session?.steps.findIndex((s) => s.id === action.payload.stepId);

        if (stepIndex !== undefined && stepIndex !== -1 && !!session)
          session.steps[stepIndex] = { id: action.payload.stepId, ...action.payload.step };
      },
      prepare(
        programId: UID_V4,
        sessionId: UID_V4,
        stepId: UID_V4,
        step: Omit<ProgramSessionStep, 'id'>
      ) {
        return { payload: { programId, sessionId, stepId, step } };
      }
    },

    removeSessionStep: {
      reducer(
        state,
        action: PayloadAction<{
          programId: UID_V4;
          sessionId: UID_V4;
          stepId: UID_V4;
        }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        const stepIndex = session?.steps.findIndex((s) => s.id === action.payload.stepId);

        if (stepIndex !== undefined && stepIndex !== -1 && !!session)
          session.steps.splice(stepIndex, 1);
      },
      prepare(programId: UID_V4, sessionId: UID_V4, stepId: UID_V4) {
        return { payload: { programId, sessionId, stepId } };
      }
    },

    setSessionSteps: {
      reducer(
        state,
        action: PayloadAction<{
          programId: UID_V4;
          sessionId: UID_V4;
          steps: ProgramSessionStep[];
        }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        if (session) session.steps = action.payload.steps;
      },
      prepare(programId: UID_V4, sessionId: UID_V4, steps: ProgramSessionStep[]) {
        return { payload: { programId, sessionId, steps } };
      }
    }
  }
});

export const {
  setState,
  createProgram,
  validateProgram,
  archiveProgram,
  deleteProgram,
  renameProgram,
  createSession,
  deleteSession,
  renameSession,
  setSessions,
  addSessionStep,
  updateSessionStep,
  removeSessionStep,
  setSessionSteps,
  restoreProgram
} = roomsStore.actions;

export default roomsStore.reducer;
