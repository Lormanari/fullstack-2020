import React from 'react';
import ReactDOM from 'react-dom';

const exercises1 = 10
const exercises2 = 7
const exercises3 = 14
const Header = (props) => (
    <h1>
        {props.course}
    </h1>
)

const Part = (props) => (
    <p>
        {props.exercise} {props.score}
    </p>
)
const Content = () => {
    const part1 = 'Fundamentals of React'
    const part2 = 'Using props to pass data'
    const part3 = 'State of a component'

    return (
        <>
        <Part exercise={part1} score={exercises1}/>
        <Part exercise={part2} score={exercises2}/>
        <Part exercise={part3} score={exercises3}/>
        </>
    )
}

const Total = (props) => (
    <p>
    Number of exercises {props.score}
    </p>
)

const App = () => {
    const course = 'Half Stack application developemnt'

    return (
        <div>
            <Header course={course} />
            <Content />
            <Total score={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
