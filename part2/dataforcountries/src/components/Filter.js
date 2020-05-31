import React from 'react'

const Filter = ({query, changehandler}) => {
	return (
		<p>Find countries <input value={query} onChange={changehandler}/></p>
	)
}

export default Filter