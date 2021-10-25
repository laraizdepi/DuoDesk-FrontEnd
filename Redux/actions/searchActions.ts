export const updateSearch = (parameters: { city: String, date: Date, people: Number, type: string }) => {
    window.sessionStorage.setItem('search', JSON.stringify(parameters))
    return {
        type: 'UPDATE_SEARCH',
        data: parameters
    }
}

export const getSearch = () => {
    const data = JSON.parse(window.sessionStorage.getItem('search') || '{}')
    return {
        type: 'GET_SEARCH',
        data
    }
}