import { useState } from 'react'

import { sortedData, sortedDataReverse } from '../../redux/slices/users/users'
import { useAppDispatch } from '../../redux/store'

const TableNavbar = (): JSX.Element => {
	const [isSorted, setIsSorted] = useState<boolean>(false)
	const [field, setField] = useState<string>('')
	const dispatch = useAppDispatch()

	const fieldsName: string[] = ['id', 'firstName', 'lastName', 'email', 'phone']
	const names: string[] = ['id', 'First Name', 'Last Name', 'Email', 'Phone']

	const sortTableData = (field: string) => {
		!isSorted ? dispatch(sortedData(field)) : dispatch(sortedDataReverse(field))
		setIsSorted(!isSorted)
		setField(field)
	}

	return (
		<thead>
			<tr>
				{names.map((item, idx) => (
					<th key={item} onClick={() => sortTableData(fieldsName[idx])}>
						{item} / {field === fieldsName[idx] ? (isSorted ? '↓' : '↑') : ''}
					</th>
				))}
			</tr>
		</thead>
	)
}

export default TableNavbar
