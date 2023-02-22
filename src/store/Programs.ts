import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

export enum ProgramStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DRAFT = 'draft'
}
export type UID_V4 = string | number[];
export interface ProgramSessionStep {
  name: string;
  setNumber: string;
  weight: string;
  restTime: string;
  reps: string;
  isUnilateral: boolean;
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
      reducer(state, action: PayloadAction<{ name: string }>) {
        const programId = uuid.v4();
        state.programs.push({
          id: programId,
          name: action.payload.name,
          sessions: [],
          status: ProgramStatus.DRAFT
        });
      },
      prepare(name: string) {
        return { payload: { name } };
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
      reducer(state, action: PayloadAction<{ programId: UID_V4; name: string }>) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        if (program) {
          program.sessions.push({
            id: uuid.v4(),
            name: action.payload.name,
            steps: []
          });
        }
      },
      prepare(programId: UID_V4, name: string) {
        return { payload: { programId, name } };
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

    addSessionStep: {
      reducer(
        state,
        action: PayloadAction<{ programId: UID_V4; sessionId: UID_V4; step: ProgramSessionStep }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        if (session) session.steps.push(action.payload.step);
      },
      prepare(programId: UID_V4, sessionId: UID_V4, step: ProgramSessionStep) {
        return { payload: { programId, sessionId, step } };
      }
    },

    updateSessionStep: {
      reducer(
        state,
        action: PayloadAction<{
          programId: UID_V4;
          sessionId: UID_V4;
          stepName: string;
          step: ProgramSessionStep;
        }>
      ) {
        //update a session step
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        const stepIndex = session?.steps.findIndex((s) => s.name === action.payload.stepName);

        if (stepIndex !== undefined && stepIndex !== -1 && !!session)
          session.steps[stepIndex] = { ...action.payload.step };
      },
      prepare(programId: UID_V4, sessionId: UID_V4, stepName: string, step: ProgramSessionStep) {
        return { payload: { programId, sessionId, stepName, step } };
      }
    },

    removeSessionStep: {
      reducer(
        state,
        action: PayloadAction<{
          programId: UID_V4;
          sessionId: UID_V4;
          stepName: string;
        }>
      ) {
        const program = state.programs.find((p) => p.id === action.payload.programId);
        const session = program?.sessions.find((s) => s.id === action.payload.sessionId);
        const stepIndex = session?.steps.findIndex((s) => s.name === action.payload.stepName);

        if (stepIndex !== undefined && stepIndex !== -1 && !!session)
          session.steps.splice(stepIndex, 1);
      },
      prepare(programId: UID_V4, sessionId: UID_V4, stepName: string) {
        return { payload: { programId, sessionId, stepName } };
      }
    }
  }
});

export const {
  setState,
  createProgram,
  deleteProgram,
  renameProgram,
  createSession,
  deleteSession,
  renameSession,
  addSessionStep,
  updateSessionStep,
  removeSessionStep
} = roomsStore.actions;

export default roomsStore.reducer;
