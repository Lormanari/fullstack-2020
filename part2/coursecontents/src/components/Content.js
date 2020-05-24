import React from 'react'
import Header from './Header'
import Part from './Part'
import Total from './Total'


const Content = ({ course }) => {
	return (
	  <div>
	  	<Header course={course} />
		{course.parts.map((part) => <Part key={part.id} part={part} /> )}
		<Total course={course} />
	  </div>
	)
}

export default Content