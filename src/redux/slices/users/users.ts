import { createSlice } from '@reduxjs/toolkit'

import { fetchUsersData } from '../../actions/action.creator'
import { RootState } from '../../store'

const initialState = {
	data: [],
	status: 'pending',
	selectedRow: null
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
		sortedDataReverse: (state, action) => {
			const sortedDataReverse = state.data.sort((a, b) => {
				return a[action.payload] < b[action.payload] ? 1 : -1
			})
		},
		selectRow(state, action) {
			state.selectedRow = action.payload
		}
	},
	extraReducers: builder => {
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
export const SelectIsData = (state: RootState) => state.usersData.data
export const SelectedIsRow = (state: RootState) => state.usersData.selectedRow

export const { sortedData, sortedDataReverse, selectRow } =
	usersDataSlice.actions
