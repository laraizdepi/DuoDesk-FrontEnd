import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authReducer'
import errorReducer from './reducers/errorReducer'

const reducer = combineReducers({
    authentication: authReducer,
    errors: errorReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store