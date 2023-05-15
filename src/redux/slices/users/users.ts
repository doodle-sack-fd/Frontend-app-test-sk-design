import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { fetchUsersData } from '../../actions/action.creator'
import { RootState } from '../../store'

import { IDataState, ISelectedRow, IUser, StatusKey } from './types.users'

const initialState: IDataState = {
	data: [],
	status: StatusKey.LOADING,
	selectedRow: null
}

export const usersDataSlice = createSlice({
	name: 'usersData',
	initialState,
	reducers: {
		sortedData: (state, action: PayloadAction<string>) => {
			const sortedData = state.data.sort((a, b) => {
				return a[action.payload] > b[action.payload] ? 1 : -1
			})
		},
		sortedDataReverse: (state, action: PayloadAction<string>) => {
			const sortedDataReverse = state.data.sort((a, b) => {
				return a[action.payload] < b[action.payload] ? 1 : -1
			})
		},
		selectRow(state, action: PayloadAction<ISelectedRow>) {
			state.selectedRow = action.payload
		},
		addUserData: (state, action: PayloadAction<IUser>) => {
			state.data.unshift(action.payload)
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchUsersData.pending, state => {
			state.status = StatusKey.LOADING
			state.data = []
		})
		builder.addCase(fetchUsersData.fulfilled, (state, action) => {
			state.status = StatusKey.SUCCESS
			state.data = action.payload
		})
		builder.addCase(fetchUsersData.rejected, state => {
			state.status = StatusKey.ERROR
			state.data = []
		})
	}
})
export const SelectIsData = (state: RootState) => state.usersData.data
export const SelectIsStatus = (state: RootState) => state.usersData.status
export const SelectedIsRow = (state: RootState) => state.usersData.selectedRow

export const { sortedData, sortedDataReverse, selectRow, addUserData } =
	usersDataSlice.actions
