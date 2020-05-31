import React from 'react'

const Country = ({country, handleClick}) => {
	return (
		<p className='mt-0 mb-5'>{country.name} <button onClick={() => handleClick(country)}>show</button><br></br></p>
	)
}

export default Country