import { configureStore } from '@reduxjs/toolkit';

import exercicesReducer from './Exercices';
import programsReducer from './Programs';
import trainingReducer from './Training';

const store = configureStore({
  reducer: {
    programs: programsReducer,
    exercices: exercicesReducer,
    training: trainingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
