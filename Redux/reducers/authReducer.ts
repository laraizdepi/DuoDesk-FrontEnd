const authReducer = (state:any = {logged: false}, action:{type: string, data: any}) => {
    if(action.type === "LOGIN"){
        return {
            logged: true,
            user: action.data
        }
    }
    else if(action.type === "INIT"){
        if(action.data){
            return {
                logged: true,
                user: action.data
            }
        }
    }
    else if(action.type === "LOGOUT"){
        return { 
            logged: false 
        }
    }
    else if(action.type === 'UPDATE_USER'){
        return {
            logged: true,
            user: action.data
        }
    }
    return state
}

export default authReducer