import { configureStore } from '@reduxjs/toolkit';

import exercicesReducer from './Exercices';
import programsReducer from './Programs';
import sessionsReducer from './Sessions';
import trainingReducer from './Training';

const store = configureStore({
  reducer: {
    programs: programsReducer,
    exercices: exercicesReducer,
    trainings: trainingReducer,
    sessions: sessionsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
