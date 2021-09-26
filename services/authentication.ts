import axios from 'axios'

export const getUserData = async () => {
    const userData = await axios.get(
        'http://localhost:5000/user/account',
        {withCredentials: true}
        )
    console.log(userData)
    return userData
}

export const logOutService = async () => {
    try{
        const response = await axios.get('http://localhost:5000/logout', {withCredentials: true})
        console.log(response)
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}

export const signUp = async(email: string, password: string, firstName: string, lastName: string) => {
    try{
        const data = {
            email,
            password,
            firstName,
            lastName
        }
        const response = await axios.post('http://localhost:5000/auth/signup', data, {
            withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              crossorigin: true
              }
        })
        // const response = await axios.get('http://localhost:5000/auth/signup')
        return response.data
    }
    catch(error){
        console.log(error)
    }
}