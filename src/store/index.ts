/**
 * REDUX STORE
 * 
 * THIS FILE CONFIGURES THE CENTRAL REDUX STORE USING REDUX TOOLKIT
 * IT COMBINES ALL SLICES AND SETS UP MIDDLEWARE
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// CONFIGURE THE REDUX STORE
const store = configureStore({
  // COMBINE ALL REDUCERS
  reducer: {
    user: userReducer,
    // ADD MORE REDUCERS HERE AS YOUR APP GROWS
  },
  // CUSTOMIZE MIDDLEWARE IF NEEDED
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // DISABLE FOR ASYNC STORAGE INTEGRATION
    }),
  // ENABLE REDUX DEVTOOLS IN DEVELOPMENT
  devTools: __DEV__,
});

// EXPORT STORE AND TYPES
export default store;

// INFER THE `ROOTSTATE` AND `APPDISPATCH` TYPES FROM THE STORE ITSELF
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
