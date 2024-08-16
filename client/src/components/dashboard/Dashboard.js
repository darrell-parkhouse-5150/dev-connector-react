import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import { connect } from 'react=redux'
import DashboardActions from './DashboardActions'

import Experience from './Experience'
import Education from './Education'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'


const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile }
}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return (
        <section className="container">
            <h1 className='large text-primary'>Dashboard
                <p className='lead'>
                    <i className='fas fa-user'></i> Welcome { user && user.name }
                </p>
                {profile !== null ? (
                    <>
                        <DashboardActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        
                        <div className="my-2">
                            <button className='btn btn-danger' onClick={() => deleteAccount}>
                                <i className='fas fa-user-minus'></i> Delete my account
                            </button>
                        </div>
                    </>
                ): (
                    <>
                        <p>You h ave not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>
                            Create Profile
                        </Link>
                    </>
                )}
            </h1>
        </section>
    )
}
Bashboard.propTypes={
    getCurrentProfile: propTypes.func.isRequired,
    deleteAccount: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    profile: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    proifle: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount})(Dashboard)
