import api from '../util/api'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_LIKES
} from './types'

export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.get('/post')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addLike = (id) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusError, status: err.response.status }
        })
    }
}

export const removeLike = (id) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusError, status: err.response.status }
        })
    }
}