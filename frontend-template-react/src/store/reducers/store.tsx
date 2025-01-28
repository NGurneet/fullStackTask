// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
// import the API slice
import authReducer from '../../api/authSlice';
import { apiSlice } from '../../api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
    [apiSlice.reducerPath]: apiSlice.reducer,
     // Add the reducer for the songs API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    
    .concat(apiSlice.middleware) // Add middleware for apiSlice
     
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
