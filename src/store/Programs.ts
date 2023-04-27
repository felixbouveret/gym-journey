import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UID_V4 } from '@/types/global.types';
import { ProgramSimplified, ProgramStatus } from '@/types/Programs.types';

type SliceState = { programsList: ProgramSimplified[]; activeProgram: ProgramSimplified | null };

const initialState: SliceState = { programsList: [], activeProgram: null };

export const roomsStore = createSlice({
  name: 'programs',

  initialState,

  reducers: {
    setPrograms: {
      reducer(state, action: PayloadAction<{ programs: ProgramSimplified[] }>) {
        state.programsList = action.payload.programs;
      },
      prepare(programs: ProgramSimplified[]) {
        return { payload: { programs } };
      }
    },

    addProgram: {
      reducer(state, action: PayloadAction<{ name: string; id: string }>) {
        state.programsList.push({
          id: action.payload.id,
          name: action.payload.name,
          program_sessions: [],
          status: ProgramStatus.DRAFT,
          created_at: new Date().toISOString()
        });
      },
      prepare(name: string, id: string) {
        return { payload: { name, id } };
      }
    },

    validateProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        const program = state.programsList.find((p) => p.id === action.payload.id);
        if (program) program.status = ProgramStatus.ACTIVE;
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    archiveProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        const program = state.programsList.find((p) => p.id === action.payload.id);
        if (program) program.status = ProgramStatus.ARCHIVED;
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    restoreProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        const program = state.programsList.find((p) => p.id === action.payload.id);
        if (program) program.status = ProgramStatus.DRAFT;
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    deleteProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        state.programsList = state.programsList.filter(
          (program) => program.id !== action.payload.id
        );
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    renameProgram: {
      reducer(state, action: PayloadAction<{ id: UID_V4; newName: string }>) {
        const program = state.programsList.find((p) => p.id === action.payload.id);
        if (program) program.name = action.payload.newName;
      },
      prepare(id: UID_V4, newName: string) {
        return { payload: { id, newName } };
      }
    }
  }
});

export const {
  setPrograms,
  addProgram,
  validateProgram,
  archiveProgram,
  deleteProgram,
  renameProgram,
  restoreProgram
} = roomsStore.actions;

export default roomsStore.reducer;
