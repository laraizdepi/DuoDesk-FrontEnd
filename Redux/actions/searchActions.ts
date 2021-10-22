export const updateSearch = (parameters: { city: String, date: Date, people: Number, type: string}) => {
    alert(JSON.stringify(parameters))
    return async(dispatch: any) => {
        dispatch({
            type: 'UPDATE_SEARCH',
            data: parameters
        })
    }
}