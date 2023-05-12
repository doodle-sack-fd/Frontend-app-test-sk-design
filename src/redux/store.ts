import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { usersDataSlice } from './slices/users/users'

export const store = configureStore({
	reducer: {
		usersData: usersDataSlice.reducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
