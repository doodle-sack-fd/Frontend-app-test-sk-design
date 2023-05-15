import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

const Search = ({ searchData }) => {
	const [search, setSearch] = useState<string>('')

	return (
		<InputGroup className='mb-3'>
			<Form.Control
				placeholder="Recipient's data"
				aria-label="Recipient's data"
				aria-describedby='basic-addon2'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<Button
				onClick={() => searchData(search)}
				variant='outline-secondary'
				id='button-addon2'
			>
				Search
			</Button>
		</InputGroup>
	)
}

export default Search
