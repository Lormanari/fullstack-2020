import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// 1.6: unicafe step1

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give feedback</h1>
	  <button onClick={()=> setGood(good + 1)}>Good</button>
	  <button onClick={()=> setNeutral(neutral + 1)}>Neutral</button>
	  <button onClick={()=> setBad(bad + 1)}>Bad</button>
	  <h1>Statistics</h1>
	  <p>Good {good}</p>
	  <p>Neutral {neutral}</p>
	  <p>Bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)