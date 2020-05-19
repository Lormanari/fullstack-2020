import React from 'react'

const Total = ({ course }) => {
	// const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises
	const total = course.parts.reduce((sum, current) => sum + current.exercises, 0)

	return(
	  <p><b>Total of {total} exercises</b></p>
	)
  }

  export default Total