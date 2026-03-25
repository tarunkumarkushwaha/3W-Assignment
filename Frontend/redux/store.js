import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    POST : postReducer,
    AUTH : authReducer
  }
})