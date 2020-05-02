import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
	<h1>
		{props.course}
	</h1>
)

const Content = (props) => (
	<p>
		{props.exercise} {props.score}
	</p>
)
const Total = (props) => (
	<p>
	Number of exercises {props.score}
	</p>
)
const App = () => {
	const course = 'Half Stack application developemnt'
	const part1 = 'Fundamentals of React'
	const exercises1 = 10
	const part2 = 'Using props to pass data'
	const exercises2 = 7
	const part3 = 'State of a component'
	const exercises3 = 14

	return (
		<div>
			<Header course={course} />
			<Content exercise={part1} score={exercises1}/>
			<Content exercise={part2} score={exercises2}/>
			<Content exercise={part3} score={exercises3}/>
			<Total score={exercises1 + exercises2 + exercises3}/>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
