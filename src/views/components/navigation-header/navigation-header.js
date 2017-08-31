import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './navigation-header.css';


const NavigationHeader = ( { title } ) => (
    <ul className="navigation-header">
        <li><NavLink isActive={() => !title} to="/">Product</NavLink></li>
        <li>{title}</li>
    </ul>
);

NavigationHeader.propTypes = {
    title: PropTypes.string
};


export default NavigationHeader;
