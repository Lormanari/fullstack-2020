import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './index.css'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Countries from './components/Countries'
import OneCountry from './components/OneCountry'
import ShowCountry from './components/ShowCountry'

const App = () => {
	const [ countries, setCountries ] = useState([])
	const [ showFiltered, setshowFiltered ] = useState('')
	const [ showCountry, setshowCountry ] = useState()

	useEffect(() => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setCountries(response.data)
		})
	}, [])

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
		<ShowCountry country={showCountry} />
	  </div>
	)
  }

export default App
