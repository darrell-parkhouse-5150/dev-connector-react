import React, {useState} from 'react'
import { connect } from 'rect-redux'
import { Link, Navigate } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register} from '../../actions/auth'
import propTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        emai: '',
        password: '',
        confirmPass: ''
    });

    const { name, email, password, confirmPass } = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPass) {
            setAlert('passwords do not match', 'danger');
        } else {
            register({ name, email, password })
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard"/>
    }

    return (
        <section className="container">
            <h1 className='large text-primary'>Sign up</h1>
            <p className='lead'>
                <i className='fas fa-user' /> create your account
            </p>
            <form  className='form' onSubmit={onSubmit}>
                 <div className='form-group'>
                    <input
                        type="text"
                        placeholder='name'
                        name='name'
                        value={name}
                        onChange={onChange}
                    />
                 </div>
                 <div className='form-group'>
                    <input
                        type="password"
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image, use
                        a Gravatar email
                    </small>
                 </div>
                 
                 <div className='form-group'>
                    <input
                        type="password"
                        placeholder='confirm password'
                        name='confirmPass'
                        value={confirmPass}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image, use
                        a Gravatar email
                    </small>
                 </div>
            </form>
            <p className='my-1'>
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </section>
    )
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