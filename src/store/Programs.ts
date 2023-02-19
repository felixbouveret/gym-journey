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
    }
  }
});

export const { createProgram, deleteProgram, renameProgram } = roomsStore.actions;

export default roomsStore.reducer;
