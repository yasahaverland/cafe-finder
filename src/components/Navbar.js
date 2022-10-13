import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (

		<div className={styles['nav-bar']}>
			{/* if the user is logged in... */}
			<Link className={styles['links']} to="/search">Search</Link>
			
			<Link className={styles['links']} to="/profile">
				Profile
			</Link>
			
			<Link className={styles['links']} to="/">
				<p onClick={handleLogout}>Logout  </p>
			</Link>

			
			
		
		</div>
	
	 )

	 const loggedOut = (
		
		<div className={styles['nav-bar']}>
			{/* if the user is not logged in... */}
			<Link className={styles['links']} to="/register">
				register  
			</Link>

			<Link className={styles['links']} to="/login">
				login
			</Link>
		</div>
	
	 )

	return (
		<nav className={styles['nav-bar']}>
			{/* user always sees this section */}
			<Link className={styles['links']} to="/">
				<p>Home</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}