import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { URL, URL_BIG } from '../../api'
import { fetchUsersData } from '../../redux/actions/action.creator'
import { ISelectedRow, StatusKey } from '../../redux/slices/users/types.users'
import {
	SelectIsData,
	SelectIsStatus,
	selectRow
} from '../../redux/slices/users/users'
import { useAppDispatch } from '../../redux/store'
import ButtonUI from '../button/ButtonUI'
import Error from '../error/Error'
import Forms from '../form/Forms'
import Loader from '../loader/Loader'
import ModalWindow from '../modal/ModalWindow'
import Pagination from '../pagination/Pagination'
import Search from '../search/Search'

import TableNavbar from './TableNavbar'

const TableData = (): JSX.Element => {
	const dispatch = useAppDispatch()

	const data = useSelector(SelectIsData)
	const status = useSelector(SelectIsStatus)

	const [show, setShow] = useState<boolean>(false)
	const [searchText, setSearchText] = useState<string>('')
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [dataPerPage] = useState<number>(50)

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

	useEffect(() => {
		dispatch(fetchUsersData(URL))
	}, [])

	const nextPage = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const handleRowClick = (item: ISelectedRow) => {
		dispatch(selectRow(item))
		setShow(!show)
	}

	const handleClose = () => setShow(false)

	const getUsersOnApi = (url: string) => {
		dispatch(fetchUsersData(url))
	}

	return (
		<>
			<ButtonUI onClick={() => getUsersOnApi(URL)}>32 data</ButtonUI>
			<ButtonUI onClick={() => getUsersOnApi(URL_BIG)}>1000 data</ButtonUI>
			<Forms />
			<Search searchData={searchData} />
			<div>
				{status === StatusKey.LOADING ? (
					<Loader />
				) : status === StatusKey.ERROR && !data ? (
					<Error />
				) : (
					<Table
						style={{ cursor: 'pointer' }}
						striped
						bordered
						hover
						variant='dark'
					>
						<TableNavbar />
						{currentDataPage.map((item, idx) => (
							<tbody key={idx}>
								<tr onClick={() => handleRowClick(item)}>
									<td>{item.id}</td>
									<td>{item.firstName}</td>
									<td>{item.lastName}</td>
									<td>{item.email}</td>
									<td>{item.phone}</td>
								</tr>
							</tbody>
						))}
					</Table>
				)}
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
