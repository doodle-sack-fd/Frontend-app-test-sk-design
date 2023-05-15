import { Button } from 'react-bootstrap'

const ButtonUI = ({ children, onClick }): JSX.Element => {
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
