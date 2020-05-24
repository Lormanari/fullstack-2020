import React from 'react'

const SinglePerson = ({person}) => {
	return (
		<p className='mt-0 mb-5'>{person.name} {person.number}<br></br></p>
	)
}

export default SinglePerson