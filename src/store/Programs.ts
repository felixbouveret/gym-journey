import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ProgramStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DRAFT = 'draft'
}

export interface ProgramSessionStep {
  name: string;
}
export interface ProgramSession {
  name: string;
  steps: ProgramSessionStep[];
}
export interface Program {
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
        state.programs.push({
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
      reducer(state, action: PayloadAction<{ name: string }>) {
        state.programs = state.programs.filter((program) => program.name !== action.payload.name);
      },
      prepare(name: string) {
        return { payload: { name } };
      }
    },
    renameProgram: {
      reducer(state, action: PayloadAction<{ name: string; newName: string }>) {
        const program = state.programs.find((p) => p.name === action.payload.name);
        if (program) program.name = action.payload.newName;
      },
      prepare(name: string, newName: string) {
        return { payload: { name, newName } };
      }
    }
  }
});

export const { createProgram, deleteProgram, renameProgram } = roomsStore.actions;

export default roomsStore.reducer;
