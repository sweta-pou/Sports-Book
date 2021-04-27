// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import Sports from './container/Sports';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navitems from './hoc/Navigations/Navigationitems';
import SingleVenue_sports from './container/SingleSports';


import Booking from './container/Booking';


function App() {
  return (
    <div >
         <Navitems/>
         <Route path="/api/sports" exact component={Sports}/>
         <Route path="/api/sports/:id" exact component={SingleVenue_sports}/>
         <Route path="/api/sports/:id/booking"exact component={Booking}/>
         <Route path="/api/signup"exact component={Booking}/>


    </div>
  );
}

export default App;
