import React from 'react'
import { CallIcon, ChatIcon, DocumentIcon } from './svg'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/userSlice';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/Register",
//     element: <Register />,
//   },
// ]);



const App = () => {
  const { user } = useSelector((state) => state.user)
  const { token } = user
  return (
    <div className='dark'>
      {/* <button onClick={() => { dispatch(logout()) }}>click me</button> */}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              token ? <Home /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App