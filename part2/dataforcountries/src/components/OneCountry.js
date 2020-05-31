import React from 'react'

const OneCountry = ({country}) => {

	return(
		<>
			{country.map((el) => {
				return (
				<div key={el.name}>
					<h1>{el.name}</h1>
					<p>capital {el.capital}<br></br>population {el.population}</p>
					<h3>Languages</h3>
					<ul>
						{el.languages.map((lan)=> <li key={lan.name}>{lan.name}</li>)}
					</ul>
					<img className="img-country-flag" src={el.flag} alt={el.name}></img>
				</div>
				)
			}
			)}
		</>
	)
}

export default OneCountry