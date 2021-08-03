const initialState = []

const scores = (state=initialState, action) => {
    switch(action.type) {
        case "FETCH_SCORES_SUCCESS":
            
            const scores = [...action.scores]
            return scores
        default:
            return state
    }
}

export default scores