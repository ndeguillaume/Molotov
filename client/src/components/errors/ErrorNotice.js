import React from 'react';

export default function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <div className="error-message">{props.message}</div>
            <div className="clear-error-button" onClick={props.clearError}>x</div>
        </div>
    );
}