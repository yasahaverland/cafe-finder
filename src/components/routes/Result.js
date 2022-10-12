import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate ,useParams } from 'react-router-dom'
import Profile from '../pages/Profile'

export default function Result(props) {
	const { yelpId } = useParams()
	const [comments, setComments] = useState([])
	const [form, setForm] = useState({
					yelpId: '',
                    name: '',
                    location: '',
                    website_link: '',
                    phone_number: '',
                    price: ''
				})
	const navigate = useNavigate()

	useEffect(() => {
		const getResult = async () => {
			try {
				const aCafe = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${yelpId}`)
				props.setCafeInfo(aCafe.data)
				setComments(aCafe.data.comment)
			} catch (err) {
				console.warn(err)
			}
		}
		getResult()
		
	}, [])
	console.log('TEST', props.cafeInfo)
	const cafeSingle = props.cafeInfo
	console.log(cafeSingle)

	const handleSubmit = async e => {
		try{
			e.preventDefault()
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${yelpId}`, form)
			// /${props.currentUser.id}
			navigate('/profile')
		} catch(err) {
			console.warn(err)
		}
	}


	// let cafe = props.cafeInfo.map(result => {
	// 	return (
	// 		<div className='big-div'>
	// 			<h2 class-name='item1'>{result.name}</h2>
	// 			<div className='item2'>
	// 				<img src='https://cdn.pixabay.com/photo/2017/02/16/08/38/icon-2070747__340.png' alt='Caffe Shopp icon' width='120px' height='150px'></img>
	// 			</div>

	// 			<p className='item3'>{result.location}</p>
	// 			<p className='item4'>{result.price}</p>

	// 		</div>
	// 	)
	// }) 
	
	let commentList = comments.map(aComment => {
		return (
			<div>
				<p>{aComment.content}</p>
				<p>{aComment.drink_name}</p>
				<p>{aComment.drink_score}</p>
			</div>
		)
	})
	
	return (
		<div className='big-div'>
			<h2 class-name='item1'>{props.cafeInfo.name}</h2>
			<div className='item2'>
				<img src='https://cdn.pixabay.com/photo/2017/02/16/08/38/icon-2070747__340.png' alt='Caffe Shopp icon' width='120px' height='150px'></img>
			</div>

			<p className='item3'>{props.cafeInfo.location}</p>
			<p className='item4'>{props.cafeInfo.price}</p>
			<a style={{ textDecoration: 'none', color: 'blue' }} target="_blank" href={`${props.cafeInfo.website_link}`}>Check this cafe on Yelp</a>
			<p className='item5'>{props.cafeInfo.phone_number}</p>

			<ul>
				{commentList}
			</ul>
			<button>Save</button>

			<form onSubmit={handleSubmit} >
				{/* type='hidden' */}
				<input  type='text' name='yelpId' value={cafeSingle.yelpId} onChange={e => setForm({...form, yelpId: e.target.value})}/>
				<button type='submit'>save</button>
			</form>
		</div>

	)
}