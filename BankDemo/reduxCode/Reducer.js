import { Sign_In, Sign_Out, Toggle_Screen, Update_Password } from "./ActionType";

const initialState = {
    isLoading: true,
    isSignIn: false,
    isSignOut: true,
    userToken: null,
    role: null,
    id: null,
    email: null,
    password: null,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Sign_In: return {
            ...state,
            isLoading: false,
            // isSignIn: true,
            // isSignOut: false,
            userToken: action.token,
            role: action.role,
            id: action.id,
            email: action.email,
            password: action.password,
        }
        case Sign_Out: return {
            ...state,
            isLoading: false,
            // isSignIn: false,
            // isSignOut: true,
            userToken: action.token,
            role: action.role,
            id: action.id,
            email: action.email,
            password: action.password
        }
        case Toggle_Screen: return {
            ...state,
            isLoading: action.payload
        }
        case Update_Password: return {
            ...state,
            password: action.payload
        }
        default: return state
    }
}