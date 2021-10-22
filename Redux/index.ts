import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authReducer'
import errorReducer from './reducers/errorReducer'
import searchReducer from './reducers/searchReducer'

const reducer = combineReducers({
    authentication: authReducer,
    search: searchReducer,
    errors: errorReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store