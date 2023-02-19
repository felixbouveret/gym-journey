import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgramSessionStep {
  name: string;
}
export interface ProgramSession {
  name: string;
  steps: ProgramSessionStep[];
}
export interface Program {
  name: string;
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
        state.programs.push({ name: action.payload.name, sessions: [] });
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
    }
  }
});

export const { createProgram, deleteProgram } = roomsStore.actions;

export default roomsStore.reducer;
