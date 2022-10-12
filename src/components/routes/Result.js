import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate ,useParams } from 'react-router-dom'
import Profile from '../pages/Profile'
import jwt_decode from 'jwt-decode'

export default function Result(props) {
	const { yelpId } = useParams()
	const [comments, setComments] = useState([])
	const [saveButton, setSaveButton] = useState("Save Button Operator")

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
// decode token here with the save cafe variable
	const getSaveConditional = async (e) => {
		try {
			e.preventDefault()
			const theCafe = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${yelpId}/${props.currentUser.id}`)
			console.log(theCafe.data)
			
			const cafeArr = theCafe.data.user.map(userId => {
				return (
					userId._id
				)
			})
			
			// save the token in localstorage
			const { token } = theCafe.data
			localStorage.setItem('jwt', token)
			
			// decode the token
			const decoded = jwt_decode(token)
			
			// set the user in App's state to be the decoded token
			props.setCurrentUser(decoded)
			
			console.log(cafeArr)
			if(cafeArr.includes(props.currentUser.id)) { // checks if the cafe has the current user inside of it
				setSaveButton("Unsave Cafe")
				console.log(saveButton)
			} else {
				setSaveButton("Save Cafe")
				console.log(saveButton)
			}

		} catch (err) {
			console.warn(err)
		}
	}



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

			<form onSubmit={getSaveConditional} >
                <button type='submit'>{saveButton}</button>
            </form>

			<ul>
				{commentList}
			</ul>
		
		</div>

	)
}