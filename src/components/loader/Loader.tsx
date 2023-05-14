import Spinner from 'react-bootstrap/Spinner'

const Loader = (): JSX.Element => {
	return (
		<Spinner
			style={{ width: '40px', height: '40px' }}
			variant='dark'
			animation='border'
			role='status'
		>
			<span className='visually-hidden'>Loading...</span>
		</Spinner>
	)
}

export default Loader
