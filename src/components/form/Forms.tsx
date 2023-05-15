import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { addUserData } from '../../redux/slices/users/users'

const Forms = () => {
	const [user, setUser] = useState({
		id: null,
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	})
	const [isOpen, setIsOpen] = useState(false)

	const dispatch = useDispatch()

	const handleChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(addUserData(user))
		setUser({
			id: null,
			firstName: '',
			lastName: '',
			email: '',
			phone: ''
		})
		setIsOpen(false)
	}

	return (
		<>
			{!isOpen ? (
				<Button
					size='lg'
					variant='dark'
					style={{ margin: '0px 15px 15px 0px' }}
					onClick={() => setIsOpen(true)}
				>
					Post user
				</Button>
			) : (
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='id'>
						<Form.Label>ID</Form.Label>
						<Form.Control
							type='number'
							name='id'
							value={user.id || ''}
							onChange={handleChange}
							placeholder='Enter ID'
							required
						/>
					</Form.Group>
					<Form.Group controlId='firstName'>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type='text'
							name='firstName'
							value={user.firstName}
							onChange={handleChange}
							placeholder='Enter First Name'
							required
						/>
					</Form.Group>
					<Form.Group controlId='lastName'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type='text'
							name='lastName'
							value={user.lastName}
							onChange={handleChange}
							placeholder='Enter Last Name'
							required
						/>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={user.email}
							onChange={handleChange}
							placeholder='Enter Email'
							required
						/>
					</Form.Group>
					<Form.Group controlId='phone'>
						<Form.Label>Phone</Form.Label>
						<Form.Control
							type='text'
							name='phone'
							value={user.phone}
							onChange={handleChange}
							placeholder='Enter Phone Number'
							required
						/>
					</Form.Group>
					<Button
						size='lg'
						variant='dark'
						type='submit'
						className='mt-3 mb-3'
						onClick={() => setIsOpen(true)}
					>
						Post user
					</Button>
				</Form>
			)}
		</>
	)
}

export default Forms
