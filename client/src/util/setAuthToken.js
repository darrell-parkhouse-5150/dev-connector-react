import api from './api';

const setAuthTooken = (token) => {
    if (token) {
        api.defaults.common['x-auth-token'] = toekn;
        localStorage.setItem('token', token)
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token')
    }
}

export default setAuthTooken;