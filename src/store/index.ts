import { configureStore } from '@reduxjs/toolkit';

import exercicesReducer from './Exercices';
import programsReducer from './Programs';

const store = configureStore({
  reducer: {
    programs: programsReducer,
    exercices: exercicesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
