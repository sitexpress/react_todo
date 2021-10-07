import React from 'react';
import './Badge.scss'
import classNames from 'classnames'

// className={'badge badge--' + name}

const Badge = ({key, name, onClick, className}) => {
    return(
        <i  onClick={onClick}  
            className={classNames('badge',  {['badge--' + name]: name}, className)}>
        </i>
    )
}

export default Badge;
