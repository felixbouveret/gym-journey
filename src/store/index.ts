import { configureStore } from '@reduxjs/toolkit';

import programsReducer from './Programs';

const store = configureStore({
  reducer: {
    programs: programsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
