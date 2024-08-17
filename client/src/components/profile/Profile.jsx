import React, { Fragment, useEffect } from 'react';
import propTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
    const {id} = useParams();

    useEffect(() => {
        getProfileById(id)
    }, [getProfileById, id])

    return (
        <section className="container">
            {profile === null ? (
                <Spinner />
            ) : (
                <>
                    <Link to="/profies" className="btn btn-light">
                        Back to Profiles
                    </Link>
                    {
                        auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.use._id && (
                            <Link to="/edit-profile" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )
                    }

                    <div className="profile-grid my-1">
                        <ProfileTop />
                        <ProfileAbout />
                        <div className="profile-exp bg-white p-2">
                            <h2 className='text-primary'>Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((exp) => (
                                        <ProfileExperience key={exp._id}
                                        experience={exp} />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className='text-primary'>Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((edu) => (
                                        <ProfileEducation
                                            key={edu._id}
                                            education={edu} />
                                    ))}
                                </Fragment>
                            ): (
                                <h4>No education credentials</h4>
                            )}
                        </div>  
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}                   
                    </div>                        
                </>
            )}
        </section>
    )
}

Profile.propTypes = {
    getProfileById: propTypes.func.isRequired,
    profile: propTypes.object.isRequired,
    auth: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps)