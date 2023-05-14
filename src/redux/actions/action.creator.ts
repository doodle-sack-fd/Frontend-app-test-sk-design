import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsersData = createAsyncThunk(
	'fetchData',
	async (url: string) => {
		try {
			const { data } = await axios.get(url)
			return data
		} catch (error) {
			throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
		}
	}
)
