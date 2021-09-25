const authReducer = (state:any = null, action:{type: string, data: any}) => {
    if(action.type === "LOGIN"){
        return {
            logged: true,
            user: action.data
        }
    }
    else if(action.type === "LOGOUT"){
        return { 
            logged: false 
        }
    }
}

export default authReducer