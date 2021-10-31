import { getUserData, logOutService } from "../../services/authentication"

export const loginUser = (init: boolean = false) => {
    return async (dispatch:any) => {
        try{
            const request = await getUserData()
            if(request){
                console.log({
                    type: init ? "INIT" : "LOGIN",
                    data: request.data
                })
                dispatch({
                    type: init ? "INIT" : "LOGIN",
                    data: request.data
                })
            }
            else{
                dispatch({
                    type: "AUTH_ERROR",
                    error: "The user doesn't exists or was eliminated"
                })
            }
        }
        catch(error){
            dispatch({
                type: "GENERAL_ERROR",
                error: `There was an error: ${error}`
            })
        }
    }
}

export const logoutUser = () => {
    return async (dispatch: any) => {
        try{
            const state = await logOutService()
            console.log(state)
            if(state){
                dispatch({
                    type: 'LOGOUT'
                })
            }
            else{
                dispatch({
                    type: 'AUTH_ERROR',
                    error: 'Something wrong happened to the log out, please, try again'
                })
            }
        }
        catch(error){
            dispatch({
                type: 'GENERAL_ERROR',
                error: `Error: ${error}`
            })
        }
    }
}

export const updateUser = (data: any) => {
    return{
        type: 'UPDATE_USER',
        data
    }
}