import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
	return (
		<>
		<p>{props.text} {props.value}</p>
		</>
	)
}
const Statistics = (props) => {
	if(props.allClicks === 0) {
		return (
			<>
			<p>No feedback given</p>
			</>
		)
	} else {
		return (
			<>
			<Statistic text="Good" value={props.good}/>
			<Statistic text="Neutral" value={props.neutral}/>
			<Statistic text="Bad" value={props.bad}/>
			<Statistic text="Average" value={props.average}/>
			<Statistic text="Positive" value={props.positive+'%'}/>
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

	  <h1>Statistics</h1>
	  <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)