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

