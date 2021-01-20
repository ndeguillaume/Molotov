import React from 'react';

export default function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <div className="error-message" onClick={props.clearError}>{props.message}</div>
        </div>
    );
}