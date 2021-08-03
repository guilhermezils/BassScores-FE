
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
            return action.user
        default:
            return state
    }
} 

export default user


