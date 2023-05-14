import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { URL, URL_BIG } from '../../api'
// import { URL_BIG } from '../../api'
import { fetchUsersData } from '../../redux/actions/action.creator'
import {
	SelectIsData,
	SelectIsStatus,
	StatusKey,
	selectRow
} from '../../redux/slices/users/users'
import { useAppDispatch } from '../../redux/store'
import ButtonUI from '../button/ButtonUI'
import Error from '../error/Error'
import Loader from '../loader/Loader'
import ModalWindow from '../modal/ModalWindow'
import Pagination from '../pagination/Pagination'

import TableNavbar from './TableNavbar'

const TableData = (): JSX.Element => {
	const dispatch = useAppDispatch()
	const [show, setShow] = useState(false)

	const data = useSelector(SelectIsData)
	const status = useSelector(SelectIsStatus)

	// idx first page
	const [currentPage, setCurrentPage] = useState(1)
	// Data on page
	const [dataPerPage] = useState(50)
	// idx last page
	const lastDataIndex = currentPage * dataPerPage
	// idx first page
	const firstDataIndex = lastDataIndex - dataPerPage
	// idx current page
	const currentDataPage = data.slice(firstDataIndex, lastDataIndex)

	const nextPage = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}
	useEffect(() => {
		dispatch(fetchUsersData(URL))
	}, [])

	const handleRowClick = item => {
		dispatch(selectRow(item))
		setShow(!show)
	}
	const getUsersOnApi = (url: string) => {
		dispatch(fetchUsersData(url))
	}
	const handleClose = () => setShow(false)

	return (
		<>
			<ButtonUI onClick={() => getUsersOnApi(URL)}>32 data</ButtonUI>
			<ButtonUI onClick={() => getUsersOnApi(URL_BIG)}>1000 data</ButtonUI>
			<div>
				<Table
					style={{ cursor: 'pointer' }}
					striped
					bordered
					hover
					variant='dark'
				>
					<TableNavbar />
					{status === StatusKey.LOADING ? (
						<Loader />
					) : status === StatusKey.ERROR ? (
						<Error />
					) : (
						currentDataPage.map((item, idx) => (
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
			<Pagination data={data} nextPage={nextPage} dataPerPage={dataPerPage} />
			<ModalWindow show={show} handleClose={handleClose} />
		</>
	)
}

export default TableData
