import { Navigate, Outlet } from 'react-router-dom';

import React from 'react'
import { useSelector } from 'react-redux';

// Importing necessary modules from the 'react-router-dom' library.

// Declaring a functional component named 'PrivateRoute'.
const  AdminRoute = () => {
    // Destructuring 'userInfo' from the state obtained via the 'useSelector' hook.
    const { userInfo } = useSelector((state) => state.auth);
   
    return (
        userInfo && userInfo.isAdmin? <Outlet /> : <Navigate to="/login" replace />
    )
}

// Exporting the 'PrivateRoute' component as the default export.
export default  AdminRoute

