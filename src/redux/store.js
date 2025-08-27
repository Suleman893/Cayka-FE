'use client'

import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

//Auth and User
import authReducer from './auth/slice'
import userReducer from './user/slice'

//Pagination
import paginationReducer from './pagination/slice'

//Core App Modules
import dashboardReducer from './dashboard/slice'
import brandReducer from './brands/slice'
import deviceReducer from './devices/slice'
import licenseReducer from './license/slice'
import consumerReducer from './consumers/slice'
import analyticsReducer from './analytics/slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  version: 1
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  pagination: paginationReducer,
  dashboard: dashboardReducer,
  analytics: analyticsReducer,
  brand: brandReducer,
  license: licenseReducer,
  device: deviceReducer,
  consumer: consumerReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
