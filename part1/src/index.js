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
	const course = 'Half Stack application development'
	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10
	}
	const part2 = {
		name: 'Using props to pass data',
		exercises: 7
	}
	const part3 = {
		name: 'State of a component',
		exercises: 14
	}

    return (
        <div>
            <Header course={course} />
            <Content exercise={part1.name} score={part1.exercises}/>
            <Content exercise={part2.name} score={part2.exercises}/>
            <Content exercise={part3.name} score={part3.exercises}/>
            <Total score={part1.exercises + part2.exercises + part3.exercises}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
