import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

export const load_user = () => async (dispatch) => {
    try {
        const res = await api.get('/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};

export const register = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/users', formData);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        const errors = err.response.data.errors;


        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
};

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const login = (email, password) => async (dispatch) => {
    const body = {email, password}

    try {
        const res = await api.post('/auth', body)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(load_user())
    } catch(err) {
        const errors = await api.post('/auth', body)

        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => ({ type: LOGOUT })