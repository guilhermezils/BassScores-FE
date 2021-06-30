// const initialState = {
//     token: localStorage.getItem('token'),
//     isAuthenticated: localStorage.getItem('token') ? true : false, // or just !!localStorage.getItem('token')
//     isLoading: false,
//     isRegistered: false
//  }


const user = (state={}, action) => {
    switch(action.type) {
        case "CURRENT_USER":
            return action.user
            

        case "LOGIN_SUCCESS":
            return action.user
        case 'LOGOUT_SUCCESS':
            return {}
        case "CREATE_USER_SUCCESS":
            return action.user
        case 'FETCH_USER_SUCCESS':
            // debugger
            return action.user
        default:
            return state
    }
} 

export default user


// import { createStore, combineReducers } from 'redux'

// function currentUser (state = null, action) {
//   switch (action.type) {
//     case 'SIGNED_IN':
//       return action.payload
//     case 'SIGNED_OUT':
//       return null
//     default:
//       return state
//   }
// }

// const reducer = combineReducers({
//   currentUser
// })

// export default createStore(reducer)