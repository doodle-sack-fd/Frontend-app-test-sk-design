import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { fetchUsersData } from '../../redux/actions/action.creator'
import {
	SelectIsData,
	SelectIsStatus,
	StatusKey,
	selectRow
} from '../../redux/slices/users/users'
import { useAppDispatch } from '../../redux/store'
import ModalWindow from '../modal/ModalWindow'

import TableNavbar from './TableNavbar'

const TableData = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const [show, setShow] = useState(false)
	const data = useSelector(SelectIsData)
	const status = useSelector(SelectIsStatus)

	useEffect(() => {
		dispatch(fetchUsersData())
	}, [])

	const handleRowClick = item => {
		dispatch(selectRow(item))
		setShow(!show)
	}

	const handleClose = () => setShow(false)

	// TODO: FIX status
	return (
		<>
			<div>
				<Table striped bordered hover variant='dark'>
					<TableNavbar />
					{status === StatusKey.LOADING ? (
						<div style={{ color: 'black' }}>Loading</div>
					) : status === StatusKey.ERROR ? (
						<div style={{ color: 'black' }}>Error loading data</div>
					) : (
						data.map((item, idx) => (
							<tbody key={idx}>
								<tr onClick={() => handleRowClick(item)}>
									<td>{item.id}</td>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
									<td>{item.email}</td>
									<td>{item.phone}</td>
								</tr>
							</tbody>
						))
					)}
				</Table>
			</div>
			<div>
				<ModalWindow show={show} handleClose={handleClose} />
			</div>
		</>
	)
}

export default TableData
