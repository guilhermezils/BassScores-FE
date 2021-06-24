export const fetchScoresSuccess = (scores) => {
    return {
        type: 'FETCH_SCORES_SUCCESS',
        scores: scores
    }
  }