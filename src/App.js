import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Result from './components/routes/Result'
import Results from './components/routes/Results'
import Navbar from './components/Navbar'
import './App.css'
import jwt_decode from 'jwt-decode'
import axios from 'axios' 
import Search from './components/routes/Search'

// export function App (term, location)







function App(term, location) {
  // // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  // const [businesses, setBusinesses] = useState([])
  // const [amountResults, setAmountResults] = useState()
  // const [searchParams, setSearchParams] = useState({term, location})

  // useEffect(() => {
  //   setBusinesses([]);
  //   const fetchData = async () => {
  //     try {
  //       const rawData = await api.get('/businesses/search', searchParams)
  //       const resp = await rawData.json()
  //       setBusinesses(resp.businesses)
  //       setAmountResults(resp.total)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchData()
  // }, [searchParams])


  // // api responses
  // const [ apiResponse, setApiResponse ] = useState([])

  // // controlled input of cofes search
  // const [ inputValue, setInputValue ] = useState('')

  // // what to search on the api
  // const [ search, setSearch ] = useState('cafe')

  // // saved cafes
  // const [ save, setSave ] = useState([])

//   // fetching api data
//   useEffect(() => {
//     const getCoffee = async () => {
//       try {
//         const url = "https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco"
//         const response = await axios.get(url)
//         console.log(response.data)
//       } catch(err){
//         console.warn(err)
//       }
//     }
//     getCoffee()
//   }, [])

const [search, setSearch] = useState('92886')
const [results, setResults] = useState([])
const [cafeInfo, setCafeInfo] = useState({ comment: []})

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        <Navbar 
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      </header>

      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={<Welcome 
              results={results} setResults={setResults} search={search} setSearch={setSearch}
              />}
          />

          <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* conditionally render auth locked routes */}
          <Route 
            path="/profile"
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
          />

          {/* <Route path="/results"
                          element={<Results/>}
                    /> */}

          {/* <Route path="/results/:yelpId"
                element={<Result/>}
          /> */}
          <Route path='/search' element={<Search results={results} setResults={setResults} search={search} setSearch={setSearch}/>} />
          {/* Addition for a results route */}
          <Route path='/search/results/:location' element={<Results results={results} setResults={setResults} search={search} setSearch={setSearch}/>} />

          <Route path='/cafes/:yelpId' element={<Result currentUser={currentUser} results={results} setResults={setResults} search={search} setSearch={setSearch} cafeInfo={cafeInfo} setCafeInfo={setCafeInfo} />} />
          
            {/* <p>[businesses, amountResults, searchParams, setSearchParams]</p> */}
      

          {/* <Route path="/"></Route> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;

