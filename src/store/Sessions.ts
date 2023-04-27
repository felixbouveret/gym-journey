import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UID_V4 } from '@/types/global.types';
import { ProgramSession } from '@/types/Programs.types';

type SliceState = { sessionsList: ProgramSession[] };

const initialState: SliceState = { sessionsList: [] };

export const sessionsStore = createSlice({
  name: 'sessions',

  initialState,

  reducers: {
    setSessions: {
      reducer(state, action: PayloadAction<{ programs: ProgramSession[] }>) {
        state.sessionsList = action.payload.programs;
      },
      prepare(programs: ProgramSession[]) {
        return { payload: { programs } };
      }
    },

    addSession: {
      reducer(state, action: PayloadAction<{ name: string; id: string }>) {},
      prepare(name: string, id: string) {
        return { payload: { name, id } };
      }
    },

    deleteSession: {
      reducer(state, action: PayloadAction<{ id: UID_V4 }>) {
        state.sessionsList = state.sessionsList.filter(
          (program) => program.id !== action.payload.id
        );
      },
      prepare(id: UID_V4) {
        return { payload: { id } };
      }
    },

    renameSession: {
      reducer(state, action: PayloadAction<{ id: UID_V4; newName: string }>) {
        const program = state.sessionsList.find((p) => p.id === action.payload.id);
        if (program) program.name = action.payload.newName;
      },
      prepare(id: UID_V4, newName: string) {
        return { payload: { id, newName } };
      }
    }
  }
});

export const { setSessions, addSession, deleteSession, renameSession } = sessionsStore.actions;

export default sessionsStore.reducer;
