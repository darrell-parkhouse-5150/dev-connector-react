import api from '../util/api'
import setAlert from './alert'


import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS,
    NO_REPOS
} from './types'

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await api.get('/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE})

    try {
        const res = await api.get('/profile/')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await api.get(`/profile/user/${userId}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const getGithubProps = (username) => async (dispatch) => {
    try {
        const res = await api.get(`/profile/github/${username}`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: NO_REPOS
        })
    }
}

export const createProfile = (formData, edit = false) => async (dispatch) => {
    try {
        const res = await api.post('/profile', formData)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? "profile updated" : 'profile created', 'success'))
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) 
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const addExperience = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/profile/experience', formData)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('experience added', 'success'));
        return res.data
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) 
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const addEducation = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/profile/experience', formData)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('education added', 'success'));
        return res.data
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) 
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
