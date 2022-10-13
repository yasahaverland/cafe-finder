import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './Results'
import styles from './Search.module.css'

export default function Search (props) {

    const navigate = useNavigate()

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/results/${props.search}`)
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
           <h1>SEARCH BAR</h1>  
    
            <form onSubmit={handleSubmit}>
                <div className='search-bar'>
                        <input
                            type ='text'
                            placeholder='enter a location'
                            value={props.search.location}
                            onChange={(e) => props.setSearch(e.target.value)}
                            />
                        
                        <button className={styles['search-btn']} type="submit" ><i className="fa-solid fa-magnifying-glass-location"></i></button>
                </div>
            </form>

            <div className={styles['results-render']}>
                <Results results={[]}/> 
            </div>
           
      </div>   
    )
}