import React from "react";

import './ErrorMessage.scss'

interface OwnProps {
    message: string
}

export const ErrorMessage: React.FC<OwnProps> = ({message}) => (
    <label className="error-message">{message}</label>
)