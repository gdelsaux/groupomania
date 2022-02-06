import React from 'react';
import { Link } from 'react-router-dom';

const Button = () => {
    return (
        <div>
            <Link to='/'>
                <button>take me home</button>
            </Link>
        </div>
    )
};

export default Button;