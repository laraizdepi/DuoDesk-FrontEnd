const errorReducers = (state: any = null, action: any) => {
    if(action.type === "AUTH_ERROR"){
        return `Authentication Error: ${action.error}`
    }
    if(action.type === "GENERAL_ERROR"){
        return `Èrror: ${action.error}`
    }
}

export default errorReducers