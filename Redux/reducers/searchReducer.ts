const searchReducer = (state: any = {}, action:{type: string, data: any}) => {
    if(action.type === "UPDATE_SEARCH"){
        return action.data
    }
    return state
}

export default searchReducer