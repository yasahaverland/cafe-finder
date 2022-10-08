import React, { useState } from 'react'

export default function Welcome(props) {
    const [term, setTerm] = useState(props.term || '')
    const [location, setLocation] = useState(props.location || '')
    
    function submit(e) {
        // if(typeof props.search === 'function') {
        //     props.search(term, location)
        // }
        console.log(term, location)
        e.preventDefault()
    }

	return (
		<div>
			<h1>Welcome start searching for a cafe:</h1>

            <form onSubmit={submit}>
                <div>
                    <p>
                        <input 
                            type ='text' 
                            placeholder='Search for a cafe, coffee, drink ....' 
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </p>
                    <p>
                        <input 
                            type ='text' 
                            placeholder='enter a location' 
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </p>
                    <p>
                        <button onClick={submit}>Search</button>
                    </p>
                </div>
            </form>
		</div>
	)
}

