const Pagination = ({ data, nextPage, dataPerPage }) => {
	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
		pageNumbers.push(i)
	}
	return (
		<div>
			<ul className='pagination'>
				{pageNumbers.map(number => (
					<li
						className='page-item'
						onClick={() => nextPage(number)}
						key={number}
					>
						<a className='page-link' href='#!'>
							{number}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Pagination
