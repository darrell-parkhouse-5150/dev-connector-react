import React from 'react'
import propTypes from 'prop-types'

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar }
    }
}) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img src={avatar} className='round-img my-1' alt="" />
            <h1 className='large'>{name}</h1>
            <p className='lead'>
                {status} {company ? <span>at {company}</span> : null }
            </p>
            <p>{location ? <span>{location}</span> : null}</p>
            <div className="icons my-1">
                {website ? (
                    <a href={website} target='_blank' rel="noopener noreferrer">
                        <i className='fas fa-globe fa-2x'></i> 
                    </a>
                ) : null}
                {social ? Object.entries(social)
                    .fileter(([_, value]) => value)
                    .map(([key, value]) => (
                        <a key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer">
                                <i className={`fab fa-${key} fa-2x`}></i> 
                            </a>
                    )) : null
                }
                {social ? Object.entries(social)
                    .filter(([_, value]) => value)
                    .map(([[key, value]]) => (
                        <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer">
                                <i className={`fab fa-${key} fa-2x`}></i> 
                            </a>
                    )) :  null}
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: propTypes.object.isRequired
}

export default ProfileTop;