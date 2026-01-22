import React from 'react';
import { Link } from 'react-router-dom';

const GoBack = () => {
    return (
        <Link to="/">
            <span>&lsaquo;</span>
        </Link>
    )
}

export default GoBack;