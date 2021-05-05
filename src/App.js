// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
import {Route} from 'react-router-dom';
import Sports from './container/Sports';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navitems from './hoc/Navigations/Navigationitems';
import SingleVenue_sports from './container/SingleSports';
import Signup from './container/Signup/Signup';
import Add from './container/Add/Add';
import Login from './container/Login/Login';
import UserContext,{UserProvider} from './hoc/context';
import {ProtectedRoute} from './protectedroutes';


function App() {
  return (
    <div >
          <UserProvider>
         <Navitems/>
         <Route path="/api/sports" exact component={Sports}/>
         <Route path="/api/sports/:id"  component={SingleVenue_sports}/>
     

         <Route path="/api/signup"exact component={Signup}/>
         <Route path="/api/login"exact component={Login}/>

         <ProtectedRoute path="/api/add"exact component={Add}/>
  
         </UserProvider>
      
        



    </div>
  );
}

export default App;
