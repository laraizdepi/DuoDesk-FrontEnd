import { getUserData, logOutService } from "../../services/authentication"

/**
     * I'm going to create a new function who is going to
     * login the user. A user can login from two differents ways:
     * 
     * 1) Social Authentication: The user choose an option like Google or
     * Facebook, and later his data is used to authenticate his account.
     *  If you choose the Social Auth, you are redirected to the last page and
     *  only get your data 
     * 2) Local Authentication: The user sends the email and the password, and
     * it's authenticated.
     */
export const loginUser = () => {
    return async (dispatch:any) => {
        try{
            const data = await getUserData()
            if(data){
                dispatch({
                    type: "LOGIN",
                    data
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