import React from 'react'

const Weather = ({weatherdata}) => {
	if(Object.keys(weatherdata).length === 0) {
	return (<></>)
	} else {
		return(
			<div>
			<h1>Weather in {weatherdata.location.name}</h1>
			<p>Temperature: {weatherdata.current.temperature} Celcius</p>
			<img className="img-current-weather" src={weatherdata.current.weather_icons[0]} alt={weatherdata.current.weather_descriptions[0]}></img>
			<p>Wind: {weatherdata.current.wind_speed} mph direction {weatherdata.current.wind_dir}</p>
			</div>
		)
	}
}

export default Weather