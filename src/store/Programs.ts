import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgramSessionStep {
  name: string;
}
interface ProgramSession {
  name: string;
  steps: ProgramSessionStep[];
}
interface Program {
  name: string;
  sessions: ProgramSession[];
}

type SliceState = { programs: Program[] };

const initialState: SliceState = { programs: [] };

export const roomsStore = createSlice({
  name: "programs",
  initialState,
  reducers: {
    createProgram: {
      reducer(state, action: PayloadAction<{ name: string }>) {
        state.programs.push({ name: action.payload.name, sessions: [] });
      },
      prepare(name: string) {
        return { payload: { name } };
      }
    }
  }
});

export const { createProgram } = roomsStore.actions;

export default roomsStore.reducer;
