import React from 'react'
import Country from './Country'

const Countries = ({filteredCountries, handleClick}) => {
	return (
		<>
		{filteredCountries.map((filteredcountry) => <Country key={filteredcountry.name} country={filteredcountry} handleClick={handleClick}/>)}
		</>
	)
}

export default Countries