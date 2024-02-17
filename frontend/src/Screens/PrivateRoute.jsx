// Importing necessary modules from the 'react-router-dom' library.

import { Navigate, Outlet } from 'react-router-dom';

import React from 'react'
import { useSelector } from 'react-redux';

// Importing React and the 'useSelector' hook from 'react-redux'.



// Declaring a functional component named 'PrivateRoute'.
const PrivateRoute = () => {
    // Destructuring 'userInfo' from the state obtained via the 'useSelector' hook.
    const { userInfo } = useSelector((state) => state.auth);
    
    // Returning a conditional rendering based on whether 'userInfo' exists.
    // If 'userInfo' exists, the <Outlet /> component is rendered.
    // Otherwise, the user is redirected to the '/login' route using the <Navigate /> component with the 'replace' prop set to true.
    return (
        userInfo ? <Outlet /> : <Navigate to="/login" replace />
    )
}

// Exporting the 'PrivateRoute' component as the default export.
export default PrivateRoute
