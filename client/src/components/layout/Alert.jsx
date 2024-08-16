import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
    const [alertState, setAlertState] = useState(alerts);

    const dismissAlert = (id) => {
        setAlertState(alertState.filter((alert) => alert.id !== id));
    };

    return (
        <div className="alert-container">
            {alerts.map((alert) => (
                <div key={alert.id} className={`alert alert-${alert.type}`} onClick={() => dismissAlert(alert.id)}>
                    {alert.msg}
                </div>
            ))}
        </div>
    );
};

Alert.propTypes = {
    alert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
