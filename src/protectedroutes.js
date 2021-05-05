import React,{useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import UserContext,{UserProvider} from './hoc/context';


export function ProtectedRoute({ component: Component, ...rest }){
  const {user,loggedIn} = useContext(UserContext);
  console.log(user);
  console.log(loggedIn);
    return(
<Route {...rest} render={(props) => (
    loggedIn === 'true'
      ? <Component {...props} />
      : <Redirect to='/api/login' />
  )} />
    )
}