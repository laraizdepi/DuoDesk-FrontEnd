const initialState = {
    stepOne: {},
    stepTwo: {},
    contact: {}
}

const newOfficeReducer = (state: any = initialState, action: any) => {
    if(action.type === "STEP_ONE"){
        return {...state, stepOne: action.data}
    }
    else if(action.type === "STEP_TWO"){
        return {...state, stepTwo: action.data}
    }
    else if(action.type === "CONTACT"){
        return {...state, contact: action.data}
    }
    else if(action.type === "SEND"){
        return null
    }    
    return state
}

export default newOfficeReducer