import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

	if (props.allClicks === 0) {
	  return (
		<>
		</>
	  )
	} else {
		return (
			<>
			<h1>Statistics</h1>
			<p>Good {props.good}<br/>
			Neutral {props.neutral}<br/>
			Bad {props.bad}<br/>
			All {props.allClicks}<br/>
			average {props.average}<br/>
			positive {props.positive}%</p>
			</>
		  )
	}
}

const Button = (props) => (
	<button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const average = (good - bad)/allClicks
  const positive = (good/allClicks*100)

  const handleClick = (newValue, allValue, setValue) => () => {
		setValue(newValue)
		setAll(allValue)
  }

  return (
    <div>
      <h1>Give feedback</h1>
	  <Button handleClick={handleClick(good + 1, allClicks + 1, setGood)} text='Good' />
	  <Button handleClick={handleClick(neutral + 1, allClicks + 1, setNeutral)} text='Neutral' />
	  <Button handleClick={handleClick(bad + 1, allClicks + 1, setBad)} text='Bad' />

	  <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)