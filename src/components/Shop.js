import React from 'react';
import { useEffect } from 'react';
import { fetchScoresSuccess } from '../actions/scores';
import { currentUser } from '../actions/user';
import { connect } from 'react-redux';
import Scores from './Scores'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 2500, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};



const Shop = ({currentUser, scores, fetchScoresSuccess}) => {
 
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
           }
          })
      }}, [])

    const renderScores = () => {
      
        return scores.map((score) => (
            <Scores key={score.id} score={score} />
        ))
    }

    return(
        <>
        <h1 >Bass Scores</h1>
        <Carousel 
              swipeable={true}
              draggable={true}
              infinite={true}
              keyBoardControl={true}
              centerMode={true}
              responsive={responsive}
              >
           
              {renderScores()}
              </Carousel>
            
        </>
    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Shop)