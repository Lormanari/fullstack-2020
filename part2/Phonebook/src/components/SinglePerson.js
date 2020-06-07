import React from 'react'

const SinglePerson = ({person, deletePerson}) => {
	return (
		<p className='mt-0 mb-5'>{person.name} {person.number}<button onClick={deletePerson}>delete</button><br></br></p>
	)
}

export default SinglePerson