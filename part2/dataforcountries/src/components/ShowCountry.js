import React from 'react'

const ShowCountry = ({country}) => {
	if(!country){
		return(<></>)
	} else {

		return(
			<div>
				<h1>{country.name}</h1>
				<p>capital {country.capital}<br></br>population {country.population}</p>
				<h3>Languages</h3>
				<ul>
				{country.languages.map((lan) => <li key={lan.name}>{lan.name}</li>)}
				</ul>
				<img className="img-country-flag" src={country.flag} alt={country.name}></img>
			</div>
		)
	}
}

export default ShowCountry