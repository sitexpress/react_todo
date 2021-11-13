import React from 'react';
import './Badge.scss'
import classNames from 'classnames'
import {Animated} from "react-animated-css";


const Badge = ({key, name, onClick, className}) => {
    return(
        <Animated animationIn="zoomInUp" animationOut="fadeOut" isVisible={true}>
            <i  onClick={onClick}  
                className={classNames('badge',  {['badge--' + name]: name}, className)}>
            </i>
        </Animated>

    )
}

export default Badge;
