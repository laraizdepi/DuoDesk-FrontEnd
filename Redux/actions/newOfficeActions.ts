import axios from 'axios'

export const stepOne = (data: any) => {
    return {
        type: "STEP_ONE",
        data
    }
} 

export const stepTwo = (data: any) => {
    return {
        type: "STEP_TWO",
        data
    }
} 

export const contact = (data: any) => {
    return {
        type: "CONTACT",
        data
    }
} 

export const send = (data: any) => {
    return async(dispatcher: any) => {
        null
    }
}