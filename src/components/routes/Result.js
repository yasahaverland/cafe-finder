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

			const cafeArr = theCafe.data.foundCafe.user.map(userId => {
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

			if (cafeArr.includes(props.currentUser.id)) { // checks if the cafe has the current user inside of it
				setSaveButton("Unsave Cafe")
			} else {
				setSaveButton("Save Cafe")
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

	const editComment = async e => {
		try {
			e.preventDefault()
			const editComment = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/cafes/${yelpId}/${props.currentUser.id}/comments`,
				{
					content: editContent,
					drink_name: editDrinkName,
					drink_score: editDrinkScore
				}
			)
			// save the token in localstorage
			const { token } = editComment.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			props.setCurrentUser(decoded)
			props.setCafeInfo(editComment.data.foundCafe)
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
			props.setCafeInfo(deleteComment.data.foundCafe)
			navigate(`/cafes/${yelpId}`)
		} catch (err) {
			console.warn(err)
		}
	}


	const commentList = props.cafeInfo.comment.map(aComment => {
		const deleteEdit = (
			<div>
				<button class="btn btn-primary" onClick={deleteComment} >Delete Comment</button>

				<form onSubmit={editComment}>

				<div class="row mb-3">
					<label className='font' htmlFor="comment">Review:</label>
					<textarea
						id="content"
						name='content'
						onChange={e => { setEditContent(e.target.value) }}
						value={editContent}
						class="col-sm-2 col-form-label col-form-label-lg"
					></textarea>
				</div>

				<div class="row mb-3">
					<label className='font' htmlFor="comment">Drink Name:</label>
					<input
						type='text'
						id='drink_name'
						onChange={e => { setEditDrinkName(e.target.value) }}
						value={editDrinkName}
						class="col-sm-2 col-form-label"
					/>
				</div>

				<div class="row mb-3">
					<label className='font' htmlFor="comment">Drink Score:</label>
					<input
						type='text'
						id='drink_score'
						onChange={e => { setEditDrinkScore(e.target.value) }}
						value={editDrinkScore}
						class="col-sm-2 col-form-label"
					/>
				</div>


					<button type='submit'>Edit Comment</button>

				</form>
			</div>
		)
		return (
			<div class="row mb-3">
				<h2 className='font'>{aComment.user.name}</h2>
				<p className='font'>{aComment.content}</p>
				<p className='font'>{aComment.drink_name}</p>
				<p className='font'>{aComment.drink_score}</p>

				{aComment.user._id == (props.currentUser != null ? props.currentUser.id : 1) ? deleteEdit : null}
			</div>
		)
	})

	const addCommentForm = () => {
		return (
			
				<form onSubmit={createComment} >

				<div class="row mb-3">
					<label className='font' htmlFor="comment">Review:</label>
					<textarea
						id="content"
						name='content'
						onChange={e => { setContent(e.target.value) }}
						value={content}
						class="col-sm-2 col-form-label col-form-label-lg"
					></textarea>
				</div>

				<div class="row mb-3">
					<label className='font' htmlFor="comment">Drink Name:</label>
					<input
						type='text'
						id='drink_name'
						onChange={e => { setDrinkName(e.target.value) }}
						value={drinkName}
						class="col-sm-2 col-form-label"
					/>
				</div>

				<div class="row mb-3">
					<label className='font' htmlFor="comment">Drink Score:</label>
					<input
						type='text'
						id='drink_score'
						onChange={e => { setDrinkScore(e.target.value) }}
						value={drinkScore}
						class="col-sm-2 col-form-label"
					/>
				</div>

					<button class="btn btn-primary" type='submit'>Submit Comment</button>

				</form>
			

		)
	}





	return (
		<div className='big-div'>
			<h2 className='item1'>{props.cafeInfo.name}</h2>
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



