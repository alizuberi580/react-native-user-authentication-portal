import axios from "axios";

const API_KEY='AIzaSyBh_s-cZhtMKsMOsMC94pKNztHEm1iOCRo';

async function authenticate(mode, email, password){
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )
    const token = response.data.idToken;
    return token;
}
export function createUser({email, password}){
    return authenticate('signUp', email, password);
}

export function loginUser({email, password}){
    return authenticate('signInWithPassword', email, password);
}