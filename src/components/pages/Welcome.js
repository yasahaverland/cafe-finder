import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Results from '../routes/Results'
import Result from '../routes/Result'
import Search from '../routes/Search'
// import { Link } from 'react-router-dom'

export default function Welcome(props) {
    const [search, setSearch] = useState('92886')
    const [results, setResults] = useState([])
    const { location } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getResults = async () => {
            try {
                // get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/results/${props.search}`, options)
                props.setResults(response.data.businesses) 
            } catch(err) {
                console.warn(err)
            }
        }
        getResults()
        
    }, [])

    const handleSubmit = async(e) => {
         e.preventDefault()
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/results/${props.search}`)
            // console.log('CONSOLELOG',response.data)
            props.setResults(response.data.businesses)
            // location = props.search
            navigate(`/search/results/${props.search}`)
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
                            value={props.search.location}
                            onChange={(e) => props.setSearch(e.target.value)}
                        />
                    </p>
                    <p>
                        <button type="submit" >Search</button> 
                    </p>
                </div>
            </form> 
            <Results 
                results={props.results}
            />
        </div>
    )
}