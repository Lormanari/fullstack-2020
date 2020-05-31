import React from 'react'
import Country from './Country'

const Countries = ({filteredCountries}) => {
	return (
		<>
		{filteredCountries.map((filteredcountry) => <Country key={filteredcountry.name} country={filteredcountry}/>)}
		</>
	)
}

export default Countries