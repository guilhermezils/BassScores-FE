import React from 'react';
import { useEffect } from 'react';
import { fetchScoresSuccess } from '../actions/scores';
import { currentUser } from '../actions/user';
import { connect } from 'react-redux';
import Scores from './Scores'



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
    
           <div >
              {renderScores()}
            </div>
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