import { START_LOADING, END_LOADING, AUTH, FETCH_USERS, LOGOUT, UPDATE_USER } from '../actions/constants'

const authReducer =(state = {authData: null, authDatas: []}, action)=> {
    const user = JSON.parse(localStorage.getItem('profile'))
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true }
        case END_LOADING:
            return {...state, isLoading: false }
        case AUTH:
            // console.log(action)
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data}
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null}

        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({...user, result: {...action?.data}}))
            // console.log(action?.data)
            return {...state, authData: action?.data}
            // return {...state, authData: state.authData.map((data) => (data._id === action?.payload._id ? action.payload : data))}

        case FETCH_USERS:
            // console.log(action)
            return {...state, authDatas: action?.payload}
        default:
            return state
    }
}

export default authReducer