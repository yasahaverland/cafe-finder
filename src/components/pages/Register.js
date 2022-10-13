import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import styles from './Register.module.css'

export default function Register({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				name,
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div>
			<h1 className={styles["login-form_title"]}>Register for an account:</h1>

			<p>{msg}</p>

			<form className={styles["login-form"]} onSubmit={handleSubmit}>
				<div className={styles['login-form__logo-container']}>
					<h1>The Perfect Blend</h1>
				</div>
				<div className={styles['login-form_contetent']}>
					<input 
						className={styles['login-form__input']}
						type="text"
						id="name"
						placeholder='Username...'
						onChange={e => setName(e.target.value)}
						value={name}
					/>

					<input 
						className={styles['login-form__input']}
						type="email"
						id="email"
						placeholder='Email...'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>

					<input 
						className={styles['login-form__input']}
						type="password"
						id="password"
						placeholder='Password...'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>

					<button className={styles['login-form__button']}  type="submit">Register</button>
				</div>
			</form>
		</div>
	)
}