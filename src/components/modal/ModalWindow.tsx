import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { SelectedIsRow } from '../../redux/slices/users/users'

const ModalWindow = ({ show, handleClose }): JSX.Element => {
	const selectedRow = useSelector(SelectedIsRow)

	return (
		<>
			<Modal
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={show}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Данные пользователя</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						{selectedRow ? (
							<div>
								<p>
									Выбран пользователь{' '}
									<b>
										{selectedRow.firstName} {selectedRow.lastName}
									</b>
								</p>
								<p>Описание:</p>
								<p>{selectedRow.description}</p>
								<p>
									Адрес проживания: <b>{selectedRow.address?.streetAddress}</b>
								</p>
								<p>
									Город: <b>{selectedRow.address?.city}</b>
								</p>
								<p>
									Провинция/штат: <b>{selectedRow.address?.state}</b>
								</p>
								<p>
									Индекс: <b>{selectedRow.address?.zip}</b>
								</p>
							</div>
						) : (
							<div>Данные не выбраны</div>
						)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ModalWindow
