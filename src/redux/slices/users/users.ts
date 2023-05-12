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
	reducers: {},
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
