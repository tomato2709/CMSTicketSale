import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import ticketReducer from './slice/ticketSlice';
import ticketPackageReducer from './slice/packageSlice';

const store = configureStore({
    reducer: {
        ticketReducer,
        ticketPackageReducer
    }
})

export type RootState  = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store