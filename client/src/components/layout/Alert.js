import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => (
    <div className='alert-container'>
        {
            alerts.map((alert) => (
                <div key={alert.id} className={`alert alert-${alert-type}`}>
                    {alert.msg}
                </div>
            ))
        }
    </div>
)

Alert.propTypes = {
    alert: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)