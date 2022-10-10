import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Welcome(props) {
    const [search, setSearch] = useState({
        location:''
    })

    // useEffect(() => {
    //     const getResults = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}&${search}`)
    //             console.log(response)
    //         } catch(err) {
    //             console.warn(err)
    //         }
    //     }
    //     getResults()
    // })
    
    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${search}`)
            console.log('CONSOLELOG',response.data)
            
        } catch(err){
            console.log(err)
        }
        
       
    }

	return (
		<div>
			<h1>Welcome start searching for a cafe:</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <p>
                        <input 
                            type ='text' 
                            placeholder='enter a location' 
                            value={search.location}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </p>
                    <p>
                        <button type="submit" >Search</button>
                    </p>
                </div>
            </form>
		</div>
	)
}

