import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { URL, URL_BIG } from '../../api'
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
import Search from '../search/Search'

import TableNavbar from './TableNavbar'

const TableData = (): JSX.Element => {
	const dispatch = useAppDispatch()

	const data = useSelector(SelectIsData)
	const status = useSelector(SelectIsStatus)

	const [show, setShow] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [dataPerPage] = useState(50)

	const filteredUsersData = () => {
		if (!searchText) {
			return data
		}
		return data.filter(element => {
			return (
				element.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
				element.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
				element.email.toLowerCase().includes(searchText.toLowerCase()) ||
				element.phone.toLowerCase().includes(searchText.toLowerCase())
			)
		})
	}
	const searchData = (text: string) => {
		setSearchText(text)
	}
	const filteredData = filteredUsersData()
	const lastDataIndex = currentPage * dataPerPage
	const firstDataIndex = lastDataIndex - dataPerPage
	const currentDataPage = filteredData.slice(firstDataIndex, lastDataIndex)

	const nextPage = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	useEffect(() => {
		dispatch(fetchUsersData(URL))
	}, [])

	const handleRowClick = (item: number) => {
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
			<Search searchData={searchData} />
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
			<Pagination
				data={filteredData}
				nextPage={nextPage}
				dataPerPage={dataPerPage}
			/>
			<ModalWindow show={show} handleClose={handleClose} />
		</>
	)
}

export default TableData
