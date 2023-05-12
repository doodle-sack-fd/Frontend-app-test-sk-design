import { createSlice } from '@reduxjs/toolkit'

import { fetchUsersData } from '../../actions/action.creator'
import { RootState } from '../../store'

const initialState = {
	data: [],
	status: 'pending'
}

export const usersDataSlice = createSlice({
	name: 'usersData',
	initialState,
	reducers: {
		sortedData: (state, action) => {
			const sortedData = state.data.sort((a, b) => {
				return a[action.payload] > b[action.payload] ? 1 : -1
			})
		},
		// TODO: fix?
		sortedDataReverse: (state, action) => {
			const sortedDataReverse = state.data.sort((a, b) => {
				return a[action.payload] < b[action.payload] ? 1 : -1
			})
		}
	},
	extraReducers: builder => {
		// TODO: GET USERSDATA
		builder.addCase(fetchUsersData.pending, state => {
			state.status = 'pending'
			state.data = []
		})
		builder.addCase(fetchUsersData.fulfilled, (state, action) => {
			state.status = 'fulfilled'
			state.data = action.payload
		})
		builder.addCase(fetchUsersData.rejected, state => {
			state.status = 'error'
			state.data = []
		})
	}
})
export const SelectIsData = (state: RootState) => state.usersData

export const { sortedData, sortedDataReverse } = usersDataSlice.actions
