import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './index.css'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Countries from './components/Countries'
import OneCountry from './components/OneCountry'
import ShowCountry from './components/ShowCountry'
import Weather from './components/Weather'

const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ showFiltered, setshowFiltered ] = useState('')
	const [ showCountry, setshowCountry ] = useState()
	const [ showWeather, setshowWeather ] = useState('')

	const api_key = process.env.REACT_APP_API_KEY

	useEffect(() => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setCountries(response.data)
		})
	}, [])

	useEffect(() => {
		if (!matchedCountries.length) return
		if(matchedCountries.length === 1) {
			const capital = matchedCountries[0].capital
			axios
			.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
			.then(response => {
				setshowWeather(response.data)
			})
		} else {
			setshowWeather('')
		}
	}, [showFiltered])


	const HandleFilterQueryChange = (event) => {
		setshowFiltered(event.target.value)
		setshowCountry()
	}

	const handleClick = (cou) => {
		if(matchedCountries.length === 1) {
			setshowCountry()
		} else {
			setshowCountry(cou)
		}
	}

	const matchedCountries = countries.filter(country => country.name.toLowerCase().indexOf(showFiltered) >= 0)
	const filteredCountries = !showFiltered.length || matchedCountries.length > 10 || matchedCountries.length === 1 ? [] : matchedCountries
	const moreThanTenNotification = showFiltered.length && matchedCountries.length > 10 ? ['Too many matches, specify another filter'] : []
	const onlyOneCountry =  matchedCountries.length === 1 ? matchedCountries : []


	return (
	  <div>
		<Filter query={showFiltered} changehandler={HandleFilterQueryChange} />
		<Countries filteredCountries={filteredCountries} handleClick={handleClick}/>
		<Notification note={moreThanTenNotification}/>
		<OneCountry country={onlyOneCountry} />
		<Weather weatherdata={showWeather} />
		<ShowCountry country={showCountry} />
	  </div>
	)
  }

export default App
