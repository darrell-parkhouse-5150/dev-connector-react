import React from 'react'
import propTyes from 'prop-types'
import formatDate from '../../util/formatDate'

const ProfileEducation = ({
    education: {
        school,
        degree,
        fos,
        to,
        from,
        description
    }
}) => (
    <div>
        <h3 className='text-dark'>{school}</h3>
        <p>
            { formatDate(from) } - { to ? formatDate(to) : 'now' } 
        </p>
        <p>
            <strong>Degree: </strong> {degree}
        </p>
        <p>
            <strong>Field of study: </strong> { fos }
        </p>
        <p>
            <strong>Description: </strong> { description } 
        </p>
    </div>
);

ProfileEducation.propTypes = {
    education: propTyes.object.isRequired
}

export default ProfileEducation;