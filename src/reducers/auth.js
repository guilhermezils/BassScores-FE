

// import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, CREATE_USER_SUCCESS, REGISTER_FAIL } from '../actions/types';

// const initialState = {
//     token: localStorage.getItem('token'),
//     isAuthenticated: localStorage.getItem('token') ? true : false, // or just !!localStorage.getItem('token')
//     isLoading: false,
//     isRegistered: false
//  }

// export default function(state = initialState, action) {
//   switch(action.type) {
//     case CREATE_USER_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//         token: null,
//         isAuthenticated: false,
//         isLoading: false,
//         isRegistered: true
//       }
//     case LOGIN_SUCCESS:
//       localStorage.setItem('token', action.payload.token);
//       return {
//         ...state,
//         ...action.payload,
//         isAuthenticated: true,
//         isLoading: false,
//       }
//     case LOGIN_FAIL:
//     case LOGOUT_SUCCESS:
//     case REGISTER_FAIL:
//       localStorage.removeItem('token');
//       return {
//         ...state,
//         token: null,
//         isAuthenticated: false,
//         isLoading: false
//       }
//     default:
//       return state;
//   }
// }