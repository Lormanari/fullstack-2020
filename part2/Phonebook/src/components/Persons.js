import React from 'react'
import SinglePerson from './SinglePerson'

const Persons = ({filteredPersons, deletePerson}) => {
	return (
		<>
		{filteredPersons.map((filteredperson) => <SinglePerson key={filteredperson.id} person={filteredperson} deletePerson={() => deletePerson(filteredperson.id, filteredperson.name)}/>)}
		</>
	)
}

export default Persons