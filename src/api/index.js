import axios from 'axios';

const url = 'http://localhost:3000/'
const api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
    }
});
const register = async(email, password) => {
    try {
        let result = await api({
            method: 'post',
            url: 'register',
            data: {
                email: email,
                password: password
            },
        });
        console.log(result.data);
        return result.data;
    } catch (error) {
        return {
            'error': true,
            'err-details': error
        }
    }
}

export default {
    register
}