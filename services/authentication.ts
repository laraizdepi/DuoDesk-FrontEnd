import axios from 'axios'

export const getUserData = async () => {
    const userData = await axios.get(
        'http://localhost:5000/user',
        { withCredentials: true }
    )
    console.log(userData)
    return userData
}

export const logOutService = async () => {
    try {
        const response = await axios.get('http://localhost:5000/logout', { withCredentials: true })
        console.log(response)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        const data = {
            email,
            password,
            firstName,
            lastName
        }
        const response = await axios.post('http://localhost:5000/auth/signup', data)
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const logIn = async (email: string, password: string) => {
    try {
        const data = {
            email, password
        }
        const response = await axios.post('http://localhost:5000/auth/login', data, { withCredentials: true })
        return response
    }
    catch (error) {
        console.log(error)
    }
}