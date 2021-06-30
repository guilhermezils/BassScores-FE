import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchScoresSuccess } from '../actions/scores';
import { fetchOrderSuccess } from '../actions/order_items';
import { currentUser } from '../actions/user';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Intro from '../components/Intro'
import NavBar from '../components/NavBar.js';
import Home from '../components/Home.js';
import Shop from '../components/Shop.js'
import Cart from '../components/Cart.js'
import ViewOrder from '../components/ViewOrder.js'
import Signup from '../components/Signup.js'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const stripe = loadStripe('pk_test_51J8ACeBLWiIT7p5qOacNPcl3gpl0QSgBYGAZW3DnH7zyiX4NdlZqEDkHQR12ZBtcjgPxRlpIkBxXovQOpuqhAaKg00YcjSNvcA');

const App = ({currentUser, fetchScoresSuccess, fetchOrderSuccess}) => {



  useEffect(() => {
    const token = localStorage.getItem('app_token')
    console.log(token)
    if (!token){
      fetch("http://localhost:3000/scores")
      .then(resp => resp.json())
      .then(scores => {
          fetchScoresSuccess(scores)
           })
    } else {
      const reqObj = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
 
      fetch('http://localhost:3000/current_session', reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.user) {
          currentUser(data.user)
      
      fetch("http://localhost:3000/scores")
      .then(resp => resp.json())
      .then(scores => {
          fetchScoresSuccess(scores)
           })
           fetch("http://localhost:3000/order_items")
      .then(resp => resp.json())
      .then(order_items => {
        // fetchOrderSuccess(order_items)
           })
         }
        })
    }}, [])









  return (
    <BrowserRouter>
      <div className="App">
        <NavBar location={window.location}/>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/shop" component={Shop}/>
          <Route exact path='/order' component={ViewOrder}/>
          <Route exact path='/signup' component={Signup}/>
          <div className="AppWrapper">
          <Elements stripe={stripe} options={ELEMENTS_OPTIONS}>
              <Route exact path="/cart" component={Cart}/>
           </Elements>
           </div>
        </Switch>
      </div>
    </BrowserRouter>
   );
};


const mapStateToProps = (state) => {
  return {
     user: state.user,
      scores: state.scores
  }
}

const mapDispatchToProps = {
  fetchScoresSuccess,
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
