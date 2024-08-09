import React, {Fragement} from 'react';
import propType from 'prop-types'

import { connect } from 'react-redux'
import { deleteEducation } from '../actions/profile'
import formatDate from '../../util/formatDate'

const Education = ({ education, deleteEducation }) => {
    const educations = education.map((edu) => (
        <tr>
            <td>
                {edu._id}
            </td>
            <td className="hide-sm">{edu.degree}</td>
            <td>{formatDate(edu.from)} - {formatDate(edu.to)}</td>
            <td>
                <button 
                    onClick={deleteEducation(edu._id)} 
                    className='btn btn-danger'>Delete</button>
                </td>
        </tr>
    ))

    return (
        <Fragement>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragement>
    )
}

Education.propTypes = {
    education: propType.array.isRequired,
    deleteEducation: propType.func.isRequired,
}

export default connect(null, {deleteEducation})(Education)
