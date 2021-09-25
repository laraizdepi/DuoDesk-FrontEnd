import axios from 'axios'

export const getUserData = async () => {
    const userData = await axios.get(
        'http://localhost:5000/user/account',
        {withCredentials: true}
        )
    console.log(userData.data)
    return userData
}

export const logOutService = async () => {
    try{
        await axios.get('http://localhost:5000/logout')
        return true
    }
    catch(error){
        console.log(error)
        return false
    }
}