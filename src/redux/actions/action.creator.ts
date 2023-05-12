import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../../api'

export const fetchUsersData = createAsyncThunk('fetchData', async () => {
	try {
		const { data } = await axios.get(URL)
		return data
	} catch (error) {
		throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
	}
})
