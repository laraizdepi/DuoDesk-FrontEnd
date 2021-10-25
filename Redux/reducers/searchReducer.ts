const searchReducer = (state = {city: '', date: new Date(Date.now()), people: 1, type: 'Oficina privada'}, action: {type: string, data: any}) => {
    if(action.type === 'GET_SEARCH'){
        return action.data
    }
    else if(action.type === 'UPDATE_SEARCH'){
        return action.data
    }
    return state
}

export default searchReducer