const redux = require ('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

// state , action, Reduces

const initialState = {
    loading: false,
    users: [],
    error: null
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest())
        return axios.get('https://jsonplaceholde.typicode.com/users')
            .then((response) => {
                dispatch(fetchUsersSuccess(response.data.map(user => user.name)))
            })
            .catch((error) => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}


const store = createStore (reducer, applyMiddleware (thunkMiddleware))
store.subscribe (() => { console.log (store.getState()) })
store.dispatch(fetchUsers())
