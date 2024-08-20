import { Sign_In, Sign_Out, Toggle_Screen, Update_Password } from "./ActionType"

export const SignIn = (token, role, id, email, pass)=> {
    return {
        type: Sign_In,
        token: token,
        role: role,
        id: id,
        email: email,
        password: pass,
    }
}

export const SignOut = (token, role, id, email, pass)=>{
    return {
        type: Sign_Out,
        token: token,
        role: role,
        id: id,
        email: email,
        password: pass
    }
}

export const toggleScreen = (data) => {
    return {
        type: Toggle_Screen,
        payload: data
    }
}

export const updatePassword = (upPass) => {
    return {
        type: Update_Password,
        payload: upPass
    }
}