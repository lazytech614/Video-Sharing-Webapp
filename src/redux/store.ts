"use client";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import FolderReducer from './slices/folders';
import WorkspacesReducer from './slices/workspaces'; 

const rootReducer = combineReducers({
  FolderReducer,
  WorkspacesReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;