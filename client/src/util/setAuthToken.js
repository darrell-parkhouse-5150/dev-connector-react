import api from './api';

/**
 * Sets the authentication token for API requests.
 * 
 * @param {string} token - The authentication token to be set.
 */
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