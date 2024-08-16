import React, { Fragment } from 'react'
import propTypes from 'prop-types'

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name }
    }
}) => (
    <div className="profie-about bg-light p-2">
        {bio && (
            <Fragment>
                <h2 className='text-primary'>{name().split(' ')[0]}s bio</h2>
                <p>{bio}</p>
                <div className="line" />
            </Fragment>
        )}
        <h2 className='text-primary'>Skill set</h2>
        <div className="skills">
            {skills.map((skill, idx) => {
                <div key={idx} className='p-1'>
                    <i className='fas fa-check'></i>{skill}
                </div>
            })}
        </div>
    </div>
)

ProfileAbout.propTypes = {
    profile: propTypes.object.isRequired
}

export default ProfileAbout;