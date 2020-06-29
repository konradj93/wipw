import React from 'react';
import './errorComponent.scss'

const ErrorComponent = ({message}) => {
    return <div className="invalid-feedback">{ message }</div>
}

export default ErrorComponent