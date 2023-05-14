import { Button } from 'react-bootstrap'

const ButtonUI = ({ children, onClick }) => {
	return (
		<Button
			size='lg'
			onClick={onClick}
			variant='dark'
			style={{ margin: '0px 15px 15px 0px' }}
		>
			{children}
		</Button>
	)
}

export default ButtonUI
