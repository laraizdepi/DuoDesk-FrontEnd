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
        await axios.get('http://localhost:5000/logout', { withCredentials: true })
        const cookies = document.cookie.split(';')
        for(let cookie of cookies){
            const eqPos = cookie.indexOf('=')
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const data = {
        email,
        password,
        firstName,
        lastName
    }
    const response = await axios.post('http://localhost:5000/auth/signup', data).catch((error) => {
        if (error.response) {
            console.log(error.response)
            return {
                status: error.response.status || 500
            }
        }
        else {
            return {
                status: 500
            }
        }
    })
    return response
}

export const logIn = async (email: string, password: string) => {
    const data = {
        email, password
    }
    const response = await axios.post('http://localhost:5000/auth/login', data, { withCredentials: true }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            return {
                status: error.response.status || 500
            }
        }
        else {
            return {
                status: 500
            }
        }
    })
    return response
}