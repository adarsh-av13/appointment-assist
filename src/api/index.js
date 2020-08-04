import axios from 'axios';
import store from '@/store/index';

// const test_url = 'http://localhost:3000/'
const url = 'https://https://appointment-assist.herokuapp.com/'
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': true,
}

const api = axios.create({
    baseURL: url,
    headers: headers,
})

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
        if (result.status === 200) {
            return {
                error: false,
                success: true
            }
        }
    } catch (error) {
        return {
            'error': true,
            'msg': 'Uh-oh please try again later'
        }
    }
}

const login = async(email, password) => {
    try {
        console.log(email, password);
        console.log(api);
        let result = await api({
            method: 'post',
            url: 'login',
            data: {
                email: email,
                password: password
            },
        });
        if (result.status === 200) {
            store.dispatch("set_authentication", {
                status: true,
                id: result.data.user_id,
                token: result.data.token
            });
            store.dispatch('profile_built', result.data.profile_setup);
            if (result.data.profile_setup) {
                let profile = await getProfile();
                store.dispatch('set_profile', profile);
            }
            return {
                'error': false,
                'success': true
            }
        }
    } catch (err) {
        return {
            'error': true,
            'msg': 'Invalid Username or Password'
        }
    }
}

const logout = async() => {
    store.dispatch('set_authentication', { status: false, id: null, token: null });
    return {
        'error': false,
        'success': true
    }
}

const saveProfile = async(profile) => {
    const authHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        'Authorization': 'Bearer ' + store.state.auth_token
    }
    let currentUrl = url + 'consultants/' + store.state.user_id + '/edit-profile'
    console.log(authHeaders, url);
    try {
        let result = await axios({
            method: 'patch',
            url: currentUrl,
            headers: authHeaders,
            data: {
                first_name: profile.firstName,
                last_name: profile.lastName,
                phone_no: profile.contactNo,
                address: profile.address,
                field: profile.field,
                active_days: profile.activeDays,
                start_time: profile.activeDays.length === 0 ? undefined : profile.startTime,
                end_time: profile.activeDays.length === 0 ? undefined : profile.endTime
            }
        });
        if (result.status === 200) {
            store.dispatch('profile_built', true);
            return {
                'error': false,
                'msg': 'Edit Successful'
            }
        }
    } catch (err) {
        console.log(err);
        return {
            'error': true,
        }
    }
}

const getProfile = async() => {
    let currentUrl = url + 'consultants/' + store.state.user_id
    try {
        let result = await axios({
            method: 'get',
            url: currentUrl,
        });
        if (result.status === 200) {
            return {
                'consultant_id': result.data._id,
                'firstName': result.data.first_name,
                'lastName': result.data.last_name,
                'contactNo': result.data.phone_no,
                'address': result.data.address,
                'activeDays': result.data.active_days,
                'field': result.data.field,
                'startTime': result.data.start_time,
                'endTime': result.data.end_time
            }
        }
    } catch (err) {
        console.log(err);
        return {
            'error': true,
        }
    }
}

const getAllConsultants = async() => {
    let currentUrl = url + 'consultants/';
    try {
        let result = await axios({
            method: 'get',
            url: currentUrl,
        });
        if (result.status === 200) {
            return result.data;
        }
    } catch (err) {
        console.log(err);
        return {
            'error': true,
        }
    }
}

const makeAppointment = async(appointment) => {
    try {
        let result = await axios({
            method: 'post',
            url: url + 'appointments/make',
            data: appointment,
        });
        if (result.status === 200) {
            return result.data;
        }
    } catch (err) {
        console.log(err);
        return {
            'error': true,
        }
    }
}

const getAppointments = async() => {
    try {
        let result = await axios({
            method: 'get',
            url: url + 'appointments/' + store.state.profile.consultant_id,
        });
        if (result.status === 200) {
            return {
                'error': false,
                'appointments': result.data,
            }
        }
    } catch (err) {
        return {
            'error': true,
        }
    }
}
export default {
    register,
    login,
    logout,
    saveProfile,
    getProfile,
    getAllConsultants,
    makeAppointment,
    getAppointments,
}