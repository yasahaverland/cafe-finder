import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<>
		<div className='nav-bar'>
			{/* if the user is logged in... */}
			<Link className='links' to="/cafes/results">Search</Link>
			
			<Link className='links' to="/profile">
				Profile
			</Link>

			<Link className='links' to="/profile"> Saved Cafes </Link>
			
			<Link className='links' to="/">
				<p onClick={handleLogout}>Logout  </p>
			</Link>

			
			
		
		</div>
		</>
	 )

	 const loggedOut = (
		<>
		<div className='nav-bar'>
			{/* if the user is not logged in... */}
			<Link className='links' to="/register">
				register  
			</Link>

			<Link className='links' to="/login">
				login
			</Link>
		</div>
		</>
	 )

	return (
		<nav className='nav-bar'>
			{/* user always sees this section */}
			<Link to="/">
				<p>Home</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}