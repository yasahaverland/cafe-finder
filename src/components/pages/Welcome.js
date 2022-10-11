import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from '../routes/Results'

export default function Welcome(props) {
    const [search, setSearch] = useState('92886')
    const [results, setResults] = useState([])

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/results/${search}`)
                setResults(response.data.businesses) 
            } catch(err) {
                console.warn(err)
            }
        }
        getResults()
        
    }, [])

    const handleSubmit = async(e) => {
         e.preventDefault()
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/results/${search}`)
            // console.log('CONSOLELOG',response.data)
            setResults(response.data.businesses) 
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
            <Results 
                results={results}
            />
        </div>
    )
}