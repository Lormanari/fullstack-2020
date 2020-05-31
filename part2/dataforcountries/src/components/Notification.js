import React from 'react'

const Notification = ({note}) => {

	return (
		<>
			{note.map((el) => <p key={el}>{el}</p>)}
		</>
	)
}

export default Notification