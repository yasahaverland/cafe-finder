import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Profile from '../pages/Profile'
import jwt_decode from 'jwt-decode'

export default function Result(props) {
	const { yelpId } = useParams()
	const [comments, setComments] = useState([])
	const [content, setContent] = useState("")
	const [drinkName, setDrinkName] = useState("")
	const [drinkScore, setDrinkScore] = useState("")
	const [editContent, setEditContent] = useState("")
	const [editDrinkName, setEditDrinkName] = useState("")
	const [editDrinkScore, setEditDrinkScore] = useState("")
	const [saveButton, setSaveButton] = useState("Save Button Operator")

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


	// decode token here with the save cafe variable
	const getSaveConditional = async (e) => {
		try {
			e.preventDefault()
			const theCafe = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${yelpId}/${props.currentUser.id}`)
			console.log(theCafe.data)

			const cafeArr = theCafe.data.foundCafe.user.map
			(userId => {
				return (
					userId
				)
			})

			console.log('CAFE ARRR', theCafe.data.foundCafe)
			
			// save the token in localstorage
			const { token } = theCafe.data
			localStorage.setItem('jwt', token)
			
			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			props.setCurrentUser(decoded)

			console.log(cafeArr)
			if (cafeArr.includes(props.currentUser.id)) { // checks if the cafe has the current user inside of it
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

	const createComment = async e => {
		try {
			e.preventDefault()
			const addComment = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${yelpId}/${props.currentUser.id}/comments`,
				{
					content: content,
					drink_name: drinkName,
					drink_score: drinkScore
				}
			)
			// save the token in localstorage
			const { token } = addComment.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			props.setCurrentUser(decoded)
			props.setCafeInfo(addComment.data.foundCafe)
			navigate(`/cafes/${yelpId}`)
		} catch (err) {
			console.warn(err)
		}
	}

	const deleteComment = async () => {
		try {
			const deleteComment = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${yelpId}/${props.currentUser.id}/comments`)
			// save the token in localstorage
			const { token } = deleteComment.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			props.setCurrentUser(decoded)
			console.log(deleteComment.data)
			props.setCafeInfo(deleteComment.data.foundCafe)
			navigate(`/cafes/${yelpId}`)
		} catch (err) {
			console.warn(err)
		}
	}

	// console.log(props.cafeInfo)

	const commentList = props.cafeInfo.comment.map(aComment => {
		const deleteEdit = (
			<div>
      
				<button onClick={deleteComment} >Delete Comment</button>

				<form onSubmit={editComment}>
					<label htmlFor="comment">Review:</label>
					<textarea
						id="content"
						name='content'
						onChange={e => { setEditContent(e.target.value) }}
						value={editContent}
					></textarea>
					<label htmlFor="comment">Drink Name:</label>
					<input
						type='text'
						id='drink_name'
						onChange={e => { setEditDrinkName(e.target.value) }}
						value={editDrinkName}
					/>
					<label htmlFor="comment">Drink Score:</label>
					<input
						type='text'
						id='drink_score'
						onChange={e => { setEditDrinkScore(e.target.value) }}
						value={editDrinkScore}
					/>
					<button type='submit'>Edit Comment</button>
				</form>

			</div>
		)
		return (
			<div>
				<h2>{aComment.user.name}</h2>
				<p>{aComment.content}</p>
				<p>{aComment.drink_name}</p>
				<p>{aComment.drink_score}</p>
				{console.log(props.currentUser)}
				

				{aComment.user._id == (props.currentUser != null ? props.currentUser.id : 1) ? deleteEdit : null}
			</div>
		)
	})

	const addCommentForm = () => {
		return (
			<form onSubmit={createComment} >

				<label htmlFor="comment">Review:</label>
				<textarea
					id="content"
					name='content'
					onChange={e => { setContent(e.target.value) }}
					value={content}
				></textarea>
				<label htmlFor="comment">Drink Name:</label>
				<input
					type='text'
					id='drink_name'
					onChange={e => { setDrinkName(e.target.value) }}
					value={drinkName}
				/>
				<label htmlFor="comment">Drink Score:</label>
				<input
					type='text'
					id='drink_score'
					onChange={e => { setDrinkScore(e.target.value) }}
					value={drinkScore}
				/>
				<button type='submit'>Submit Comment</button>
			</form>
		)
	}


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

			<div>


				{props.currentUser ? addCommentForm() : null}
			</div>

		</div>

	)
}