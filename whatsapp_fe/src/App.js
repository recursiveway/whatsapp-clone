import React from 'react'
import { CallIcon, ChatIcon, DocumentIcon } from './svg'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

const App = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => { dispatch(logout()) }}>click me</button>
      <RouterProvider router={router} />
    </div>
  )
}

export default App