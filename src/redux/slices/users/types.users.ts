export interface IDataState {
	data: IUser[]
	status: string
	selectedRow: ISelectedRow
}

export interface IUser {
	id: number
	firstName: string
	lastName: string
	email: string
	phone: string
	address?: {
		streetAddress: string
		city: string
		state: string
		zip: string
	}
	description?: string
}

export interface ISelectedRow extends IUser {}

export enum StatusKey {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}
