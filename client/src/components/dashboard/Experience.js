import React, { fragement } from 'react';
import propTypes  from 'prop-types'
import { copmnect } from 'react-redux'
import { deleteExperience } from '../../actions/profile'
import formatDate from '../../util/formatDate'

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map((exp) => {
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                { formatDate(exp.from) } - {exp.to ? formatDate(exp.to) : 'Now' }
            </td>
            <td>
                <button
                    onClick={() => deleteExperience(exp._id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    })

    return (
        <Fragment>
            <h2 className='my-2'>exaperience credentials</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>title</th>
                        <th className='hide-sm'>years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experience}</tbody>
            </table>
        </Fragment>
    )
}