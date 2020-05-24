import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'


const Course = ({ course }) => {
	return (
	  <div>
	  	<Header course={course} />
		{/* {course.parts.map((part) => <Part key={part.id} part={part} /> )} */}
		<Content course={course} />
		<Total course={course} />
	  </div>
	)
}

export default Course