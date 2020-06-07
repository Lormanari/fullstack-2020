import React from 'react'

const Showerror = ({message}) => {
	if (message === null) {
		return null
	  }
	 return (
			  <div className="error">
				  {message}
			  </div>
	 )

}

export default Showerror