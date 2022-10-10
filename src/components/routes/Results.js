import React from 'react'
import { Result } from '../routes/Result'

export default function Results(props) {
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


