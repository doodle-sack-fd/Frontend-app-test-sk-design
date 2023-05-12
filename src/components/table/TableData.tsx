import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { fetchUsersData } from '../../redux/actions/action.creator'
import { SelectIsData } from '../../redux/slices/users/users'
import { useAppDispatch } from '../../redux/store'

import TableNavbar from './TableNavbar'

const TableData = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const { data } = useSelector(SelectIsData)

	useEffect(() => {
		dispatch(fetchUsersData())
	}, [])

	return (
		<div>
			<Table striped bordered hover variant='dark'>
				<TableNavbar />
				{data.map((item, idx) => (
					<tbody key={idx}>
						<tr>
							<td>{item.id}</td>
							<td>{item.firstName}</td>
							<td>{item.lastName}</td>
							<td>{item.email}</td>
							<td>{item.phone}</td>
						</tr>
					</tbody>
				))}
			</Table>
		</div>
	)
}

export default TableData
