import React from 'react'

const Filter = ({query, changehandler}) => {
	return (
		<p>Filter shown with <input value={query} onChange={changehandler}/></p>
	)
}

export default Filter