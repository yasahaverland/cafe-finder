import React from 'react'
import Result  from '../routes/Result'
import { useState } from 'react'
import {Link} from 'react-router-dom'

export default function Results(props) {
	console.log(props.results)
	const cafe = props.results.map((result, i) => {
		return (
			<div key={`result${i}`} className='big-div'>
				<Link to={`/cafes/${result.id}`}><h2 className='item1'>{result.name}</h2></Link> 
				<div className='item2'>
				<img src='https://uxwing.com/wp-content/themes/uxwing/download/food-and-drinks/coffee-bean-icon.png' alt='Coffee beans'></img>
				</div>
				<p className='item3'>{result.location.display_address[0]}</p>
				<p className='item4'>{result.price}</p>
				
				{/* <button className='save-btn'>⭐️</button> */}
			</div>
		)
	}) 

	return (
		<div>
			{cafe}
	
		</div>
	)
}
