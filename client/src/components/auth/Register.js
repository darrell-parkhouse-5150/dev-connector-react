import React, {useState} from 'react'
import { connect } from 'rect-redux'
import { Link, Navigate } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register} from '../../actions/auth'
import propTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {

}

Register.propTypes = {
    setAlert: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps =(state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);