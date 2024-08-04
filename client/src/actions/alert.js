import { v4 as uuid } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types'


/**
 * Dispatches an action to set an alert with the provided message, alert type, and optional timeout.
 * Generates a unique id for the alert using uuid.
 * Sets a timeout to automatically remove the alert after the specified duration.
 *
 * @param {string} msg - The message content of the alert.
 * @param {string} alertType - The type of the alert (e.g., 'success', 'error').
 * @param {number} [timeout=5000] - The duration in milliseconds before the alert is automatically removed.
 */
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id } 
    })

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}