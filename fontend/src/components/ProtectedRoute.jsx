import React from 'react';
import Login from './Login';
import Home from './Home';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log('here');
    const accessToken = localStorage.getItem('access')
    if(accessToken)  {
        return (
            <Home/>
        )
    }else{
        return(
            <Login/>
        )
    }  
};

export default ProtectedRoute;