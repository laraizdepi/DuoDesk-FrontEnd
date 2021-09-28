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
    return state
}

export default authReducer