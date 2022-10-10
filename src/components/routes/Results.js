import React from 'react'
import { Result } from '../routes/Result'
import { useState } from 'react'

export default function Results(props) {
	console.log(props.results)
	const cafe = props.results.map(result => {
		return (
			<div>
				<h2>{result.name}</h2>
			</div>
		)
	}) 

	return (
		<div>
			{cafe}
			<Result 
			/>
		</div>
	)
}
